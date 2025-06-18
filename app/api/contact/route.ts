import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const { name, email, phone, message, visitors, package: selectedPackage, room } = formData

    // First, submit to Google Sheets (existing functionality)
    let sheetsSuccess = false
    try {
      const sheetsResponse = await fetch(process.env.NEXT_PUBLIC_SHEETS_FORM!, {
        method: "POST",
        body: JSON.stringify(formData),
      })
      const sheetsResult = await sheetsResponse.json()
      sheetsSuccess = sheetsResult.result === "success"
    } catch (sheetsError) {
      console.error("Google Sheets submission error:", sheetsError)
    }

    // Send email notification using Nodemailer
    let emailSuccess = false
    try {
      // Create transporter using Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER, // Your Gmail address
          pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
        },
      })

      // Email content
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #2d5016; padding: 20px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: #f5f5dc; margin: 0; font-size: 24px;">New Inquiry - Save Farm</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #2d5016; margin-top: 0;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #2d5016; width: 30%;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #2d5016;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">+91 ${phone}</td>
              </tr>
              ${
                email
                  ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #2d5016;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
              </tr>
              `
                  : ""
              }
            </table>

            <h2 style="color: #2d5016; margin-top: 30px;">Booking Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #2d5016; width: 30%;">Number of Visitors:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${visitors}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #2d5016;">Package:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${selectedPackage}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #2d5016;">Room:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${room}</td>
              </tr>
            </table>

            ${
              message
                ? `
            <h2 style="color: #2d5016; margin-top: 30px;">Message</h2>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #2d5016;">
              <p style="margin: 0; line-height: 1.6;">${message}</p>
            </div>
            `
                : ""
            }

            <div style="margin-top: 30px; padding: 20px; background-color: #f0f8e8; border-radius: 5px; border: 1px solid #2d5016;">
              <h3 style="color: #2d5016; margin-top: 0;">Quick Actions</h3>
              <p style="margin: 10px 0;">
                <strong>Call:</strong> 
                <a href="tel:+91${phone}" style="color: #2d5016; text-decoration: none;">+91 ${phone}</a>
              </p>
              <p style="margin: 10px 0;">
                <strong>WhatsApp:</strong> 
                <a href="https://wa.me/91${phone}" style="color: #2d5016; text-decoration: none;" target="_blank">Send WhatsApp Message</a>
              </p>
              ${
                email
                  ? `
              <p style="margin: 10px 0;">
                <strong>Email:</strong> 
                <a href="mailto:${email}" style="color: #2d5016; text-decoration: none;">${email}</a>
              </p>
              `
                  : ""
              }
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>This inquiry was submitted through the Save Farm website contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
          </div>
        </div>
      `

      // Send email
      const mailOptions = {
        from: `"Save Farm" <${process.env.GMAIL_USER}>`,
        to: "aditya@savefarm.in, info@savefarm.in, devansh.sawant@somaiya.edu",
        subject: `New Inquiry from ${name} - Save Farm`,
        html: htmlContent,
        // Optional: Add reply-to if customer provided email
        ...(email && { replyTo: email }),
      }

      await transporter.sendMail(mailOptions)
      emailSuccess = true
      console.log("Email sent successfully via Nodemailer")
    } catch (emailError) {
      console.error("Email sending error:", emailError)
    }

    // Return response based on success/failure
    if (sheetsSuccess || emailSuccess) {
      return NextResponse.json({
        success: true,
        message: "Form submitted successfully",
        details: {
          sheetsSubmitted: sheetsSuccess,
          emailSent: emailSuccess,
        },
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to submit form. Please try again or contact us directly.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 },
    )
  }
}
