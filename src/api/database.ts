import { supabase, STORAGE_CONFIG } from '../lib/supabase'

export interface JobApplication {
  id?: string
  full_name: string
  email: string
  phone: string
  position: string
  country: string
  experience: string
  skills: string
  cover_letter: string
  cv_file_url?: string
  cv_file_name?: string
  payment_screenshot_url?: string
  payment_screenshot_name?: string
  payment_method?: string
  wallet_address?: string
  network?: string
  coin?: string
  transaction_id?: string
  source: string
  applied_at: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'confirmed'
}

export interface ContactInquiry {
  id?: string
  full_name: string
  email: string
  phone: string
  subject: string
  message: string
  submitted_at: string
  source: string
}

export interface EmailSubscription {
  id?: string
  email: string
  subscribed_at: string
}

// Test database connection
export const testDatabaseConnection = async (): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('🔍 Testing database connection...')
    const { data, error } = await supabase
      .from('job_applications')
      .select('count')
      .limit(1)

    if (error) {
      console.error('❌ Database connection test failed:', error)
      return { success: false, message: `Database connection failed: ${error.message}` }
    }

    console.log('✅ Database connection successful')
    return { success: true, message: 'Database connection successful' }
  } catch (error) {
    console.error('❌ Database connection test error:', error)
    return { success: false, message: `Database connection error: ${error}` }
  }
}

// Upload file to Supabase Storage
export const uploadFile = async (file: File, folder: string, fileName: string): Promise<string> => {
  try {
    // Clean filename to avoid special characters
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filePath = `${STORAGE_CONFIG.folder}/${folder}/${cleanFileName}`
    
    console.log('📤 Uploading file to:', filePath)
    console.log('📁 File details:', { name: file.name, size: file.size, type: file.type })
    
    const { data, error } = await supabase.storage
      .from(STORAGE_CONFIG.bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true // Allow overwriting
      })

    if (error) {
      console.error('❌ Storage upload error:', error)
      console.error('❌ Error details:', {
        message: error.message,
        name: error.name
      })
      throw error
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_CONFIG.bucket)
      .getPublicUrl(filePath)

    console.log('✅ File uploaded successfully:', urlData.publicUrl)
    return urlData.publicUrl
  } catch (error) {
    console.error('❌ Error uploading file:', error)
    throw error
  }
}

// Save job application to database
export const saveJobApplication = async (applicationData: any): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('📝 Saving job application to database:', applicationData)
    console.log('🔗 Supabase client initialized:', !!supabase)

    // Test database connection first
    const connectionTest = await testDatabaseConnection()
    if (!connectionTest.success) {
      console.error('❌ Database connection failed:', connectionTest.message)
      return { success: false, message: connectionTest.message }
    }

    // First, save basic data to database without files
    const dbData: JobApplication = {
      full_name: applicationData.fullName,
      email: applicationData.email,
      phone: applicationData.phone,
      position: applicationData.position,
      country: applicationData.country,
      experience: applicationData.experience,
      skills: applicationData.skills,
      cover_letter: applicationData.coverLetter,
      cv_file_url: '', // Will be updated after file upload
      cv_file_name: applicationData.cvFileName,
      payment_screenshot_url: '', // Will be updated after file upload
      payment_screenshot_name: applicationData.paymentScreenshotName,
      payment_method: applicationData.paymentMethod,
      wallet_address: applicationData.walletAddress,
      network: applicationData.network,
      coin: applicationData.coin,
      transaction_id: applicationData.transactionId,
      source: applicationData.source,
      applied_at: applicationData.appliedAt,
      status: applicationData.status
    }

    // Check if application already exists
    console.log('🔍 Checking for existing application with email:', dbData.email)
    const { data: existingData, error: checkError } = await supabase
      .from('job_applications')
      .select('id')
      .eq('email', dbData.email)
      .single()

    let applicationId: string

    if (existingData) {
      // Update existing application
      console.log('🔄 Updating existing application:', existingData.id)
      const { data: updateData, error: updateError } = await supabase
        .from('job_applications')
        .update(dbData)
        .eq('id', existingData.id)
        .select()

      if (updateError) {
        console.error('❌ Database update error:', updateError)
        return { success: false, message: `Database update error: ${updateError.message}` }
      }

      applicationId = existingData.id
      console.log('✅ Application updated successfully')
    } else {
      // Insert new application
      console.log('💾 Inserting new data into job_applications table...')
      const { data: insertData, error: insertError } = await supabase
        .from('job_applications')
        .insert([dbData])
        .select()

      if (insertError) {
        console.error('❌ Database insert error:', insertError)
        console.error('❌ Error details:', {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code
        })
        return { success: false, message: `Database error: ${insertError.message}` }
      }

      applicationId = insertData[0].id
      console.log('✅ New application created successfully')
    }

    console.log('✅ Basic data saved to database with ID:', applicationId)

    // Now try to upload files and update the record
    let updateData: any = {}

    // Upload CV file if present
    if (applicationData.cvFile) {
      try {
        const cvFileName = `${applicationId}_${applicationData.cvFileName || 'cv.pdf'}`
        const cvFileUrl = await uploadFile(applicationData.cvFile, 'cv', cvFileName)
        updateData.cv_file_url = cvFileUrl
        console.log('✅ CV file uploaded:', cvFileUrl)
      } catch (cvError) {
        console.error('❌ Failed to upload CV file:', cvError)
        // Continue without CV file
      }
    }

    // Upload payment screenshot if present
    if (applicationData.paymentScreenshot) {
      try {
        const screenshotFileName = `${applicationId}_${applicationData.paymentScreenshotName || 'payment.png'}`
        const paymentScreenshotUrl = await uploadFile(applicationData.paymentScreenshot, 'payments', screenshotFileName)
        updateData.payment_screenshot_url = paymentScreenshotUrl
        console.log('✅ Payment screenshot uploaded:', paymentScreenshotUrl)
      } catch (screenshotError) {
        console.error('❌ Failed to upload payment screenshot:', screenshotError)
        // Continue without payment screenshot
      }
    }

    // Update the record with file URLs if any files were uploaded
    if (Object.keys(updateData).length > 0) {
      const { error: updateError } = await supabase
        .from('job_applications')
        .update(updateData)
        .eq('id', applicationId)

      if (updateError) {
        console.error('❌ Error updating file URLs:', updateError)
      } else {
        console.log('✅ File URLs updated successfully')
      }
    }

    console.log('✅ Job application saved to database with ID:', applicationId)
    return { success: true, message: 'Application submitted successfully!' }
  } catch (error) {
    console.error('❌ Error saving job application:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}

// Get all job applications
export const getAllJobApplications = async (): Promise<JobApplication[]> => {
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .order('applied_at', { ascending: false })

    if (error) {
      console.error('Error fetching job applications:', error)
      return []
    }

    console.log('✅ Job applications fetched:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching job applications:', error)
    return []
  }
}

// Save contact inquiry
export const saveContactInquiry = async (inquiryData: any): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('📝 Saving contact inquiry to database:', inquiryData)

    const dbData: ContactInquiry = {
      full_name: inquiryData.fullName,
      email: inquiryData.email,
      phone: inquiryData.phone,
      subject: inquiryData.subject,
      message: inquiryData.message,
      submitted_at: inquiryData.submittedAt,
      source: inquiryData.source
    }

    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert([dbData])
      .select()

    if (error) {
      console.error('Error saving contact inquiry:', error)
      return { success: false, message: 'Failed to save inquiry' }
    }

    console.log('✅ Contact inquiry saved to database:', data)
    return { success: true, message: 'Inquiry submitted successfully!' }
  } catch (error) {
    console.error('Error saving contact inquiry:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}

// Get all contact inquiries
export const getAllContactInquiries = async (): Promise<ContactInquiry[]> => {
  try {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .order('submitted_at', { ascending: false })

    if (error) {
      console.error('Error fetching contact inquiries:', error)
      return []
    }

    console.log('✅ Contact inquiries fetched:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching contact inquiries:', error)
    return []
  }
}

// Save email subscription
export const saveEmailSubscription = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('📝 Saving email subscription:', email)

    const { data, error } = await supabase
      .from('email_subscriptions')
      .insert([{ email, subscribed_at: new Date().toISOString() }])
      .select()

    if (error) {
      console.error('Error saving email subscription:', error)
      return { success: false, message: 'Failed to save subscription' }
    }

    console.log('✅ Email subscription saved:', data)
    return { success: true, message: 'Subscription successful!' }
  } catch (error) {
    console.error('Error saving email subscription:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}

// Get all email subscriptions
export const getAllEmailSubscriptions = async (): Promise<EmailSubscription[]> => {
  try {
    const { data, error } = await supabase
      .from('email_subscriptions')
      .select('*')
      .order('subscribed_at', { ascending: false })

    if (error) {
      console.error('Error fetching email subscriptions:', error)
      return []
    }

    console.log('✅ Email subscriptions fetched:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching email subscriptions:', error)
    return []
  }
}
