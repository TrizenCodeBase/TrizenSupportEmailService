# 📎 Email Service - Attachment Support Guide

## 🚀 **New Feature: File Attachments**

The Support Email Service now supports **file attachments** for bulk emails! Perfect for sending assignment PDFs, documents, and other files to multiple candidates.

---

## 📧 **Updated API Endpoint**

**Endpoint:** `POST /api/support/send-bulk`

**Production URL:** `https://trizensupportemailservice.llp.trizenventures.com/api/support/send-bulk`

---

## 🔑 **Authentication**

```javascript
{
  "Content-Type": "application/json",
  "X-API-Key": "trizen-support-email-2024-secure-key-xyz789"
}
```

---

## 📋 **Updated Request Body Structure**

```json
{
  "clients": [
    {
      "email": "candidate1@example.com",
      "name": "Candidate 1"
    },
    {
      "email": "candidate2@example.com",
      "name": "Candidate 2"
    }
  ],
  "subject": "MERN Stack Intern Assignment - Trizen Ventures",
  "message": "Dear [Name],\n\nYour assignment details are attached...",
  "isHtml": false,
  "attachments": [
    {
      "filename": "MERN_Assignment.pdf",
      "content": "base64-encoded-pdf-content",
      "encoding": "base64",
      "contentType": "application/pdf"
    }
  ]
}
```

---

## 📎 **Attachment Types Supported**

### **1. Base64 Content (Recommended)**
```json
{
  "filename": "assignment.pdf",
  "content": "JVBERi0xLjQKJcOkw7zDtsO8...",
  "encoding": "base64",
  "contentType": "application/pdf"
}
```

### **2. File Path (Server-side files)**
```json
{
  "filename": "assignment.pdf",
  "path": "/path/to/assignment.pdf"
}
```

### **3. Simple File Path (String)**
```json
"./assignments/MERN_Stack_Assignment.pdf"
```

---

## 🎯 **Complete Implementation for MERN Stack Assignment**

### **JavaScript/Node.js Example**

```javascript
const sendAssignmentEmails = async () => {
  // Your candidate list
  const candidates = [
    { email: "candidate1@example.com", name: "Candidate 1" },
    { email: "candidate2@example.com", name: "Candidate 2" },
    { email: "candidate3@example.com", name: "Candidate 3" },
    { email: "candidate4@example.com", name: "Candidate 4" },
    { email: "candidate5@example.com", name: "Candidate 5" },
    { email: "candidate6@example.com", name: "Candidate 6" },
    { email: "candidate7@example.com", name: "Candidate 7" },
    { email: "candidate8@example.com", name: "Candidate 8" },
    { email: "candidate9@example.com", name: "Candidate 9" },
    { email: "candidate10@example.com", name: "Candidate 10" }
  ];

  // Assignment message
  const assignmentMessage = `Dear [Name],

Thank you for your interest in the MERN Stack Intern position at Trizen Ventures. We are pleased to inform you that you have been selected for the next phase of our evaluation process.

As part of our selection process, we would like you to complete a technical assignment that will help us assess your skills in MERN stack development. The assignment details and requirements are attached to this email in PDF format.

Please review the assignment carefully and submit your completed work within the specified deadline. This assignment will be a key factor in our final selection decision.

If you have any questions about the assignment or need clarification on any requirements, please don't hesitate to reach out to us.

We look forward to reviewing your submission and wish you the best of luck!

Best regards,
Trizen Ventures HR Team`;

  // Convert PDF to base64 (example)
  const fs = require('fs');
  const pdfPath = './MERN_Stack_Assignment.pdf';
  const pdfContent = fs.readFileSync(pdfPath).toString('base64');

  const response = await fetch('https://trizensupportemailservice.llp.trizenventures.com/api/support/send-bulk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'trizen-support-email-2024-secure-key-xyz789'
    },
    body: JSON.stringify({
      clients: candidates,
      subject: "MERN Stack Intern Assignment - Trizen Ventures",
      message: assignmentMessage,
      isHtml: false,
      attachments: [
        {
          filename: "MERN_Stack_Assignment.pdf",
          content: pdfContent,
          encoding: "base64",
          contentType: "application/pdf"
        }
      ]
    })
  });

  const result = await response.json();
  console.log('Bulk email with attachments result:', result);
  return result;
};
```

### **Python Example**

```python
import requests
import base64

def send_assignment_emails():
    # Your candidate list
    candidates = [
        {"email": "candidate1@example.com", "name": "Candidate 1"},
        {"email": "candidate2@example.com", "name": "Candidate 2"},
        {"email": "candidate3@example.com", "name": "Candidate 3"},
        {"email": "candidate4@example.com", "name": "Candidate 4"},
        {"email": "candidate5@example.com", "name": "Candidate 5"},
        {"email": "candidate6@example.com", "name": "Candidate 6"},
        {"email": "candidate7@example.com", "name": "Candidate 7"},
        {"email": "candidate8@example.com", "name": "Candidate 8"},
        {"email": "candidate9@example.com", "name": "Candidate 9"},
        {"email": "candidate10@example.com", "name": "Candidate 10"}
    ]

    # Assignment message
    assignment_message = """Dear [Name],

Thank you for your interest in the MERN Stack Intern position at Trizen Ventures. We are pleased to inform you that you have been selected for the next phase of our evaluation process.

As part of our selection process, we would like you to complete a technical assignment that will help us assess your skills in MERN stack development. The assignment details and requirements are attached to this email in PDF format.

Please review the assignment carefully and submit your completed work within the specified deadline. This assignment will be a key factor in our final selection decision.

If you have any questions about the assignment or need clarification on any requirements, please don't hesitate to reach out to us.

We look forward to reviewing your submission and wish you the best of luck!

Best regards,
Trizen Ventures HR Team"""

    # Read and encode PDF file
    with open('MERN_Stack_Assignment.pdf', 'rb') as pdf_file:
        pdf_content = base64.b64encode(pdf_file.read()).decode('utf-8')

    # API request
    url = "https://trizensupportemailservice.llp.trizenventures.com/api/support/send-bulk"
    headers = {
        "Content-Type": "application/json",
        "X-API-Key": "trizen-support-email-2024-secure-key-xyz789"
    }
    
    data = {
        "clients": candidates,
        "subject": "MERN Stack Intern Assignment - Trizen Ventures",
        "message": assignment_message,
        "isHtml": False,
        "attachments": [
            {
                "filename": "MERN_Stack_Assignment.pdf",
                "content": pdf_content,
                "encoding": "base64",
                "contentType": "application/pdf"
            }
        ]
    }

    response = requests.post(url, json=data, headers=headers)
    result = response.json()
    print("Bulk email with attachments result:", result)
    return result
```

---

## 🧪 **Testing the Attachment Feature**

### **Run the Test Suite**

```bash
npm run test:attachments
```

### **Manual Testing**

```bash
# Test with curl (using base64 encoded content)
curl -X POST https://trizensupportemailservice.llp.trizenventures.com/api/support/send-bulk \
  -H "Content-Type: application/json" \
  -H "X-API-Key: trizen-support-email-2024-secure-key-xyz789" \
  -d '{
    "clients": [
      {"email": "test@example.com", "name": "Test Candidate"}
    ],
    "subject": "Test Assignment with Attachment",
    "message": "Dear [Name],\n\nPlease find the attached assignment.\n\nBest regards,\nTrizen Ventures",
    "isHtml": false,
    "attachments": [
      {
        "filename": "test-assignment.pdf",
        "content": "JVBERi0xLjQKJcOkw7zDtsO8...",
        "encoding": "base64",
        "contentType": "application/pdf"
      }
    ]
  }'
```

---

## 📊 **Expected Response**

```json
{
  "success": true,
  "message": "Bulk emails sent successfully. Sent: 10, Failed: 0",
  "data": {
    "success": true,
    "results": [
      {
        "email": "candidate1@example.com",
        "success": true,
        "messageId": "<message-id-1>"
      },
      {
        "email": "candidate2@example.com",
        "success": true,
        "messageId": "<message-id-2>"
      }
    ],
    "totalSent": 10,
    "totalFailed": 0,
    "timestamp": "2025-01-27T10:30:00.000Z"
  }
}
```

---

## 🎯 **Key Features**

✅ **PDF Attachments** - Send assignment PDFs with emails  
✅ **Multiple Attachments** - Support for multiple files per email  
✅ **Base64 Encoding** - Secure file content transmission  
✅ **File Path Support** - Server-side file attachment  
✅ **Dynamic Names** - Personalized greetings for each candidate  
✅ **Professional Templates** - Trizen Ventures branded emails  
✅ **Rate Limiting** - 1-second delay between emails  
✅ **Error Tracking** - Success/failure reporting per email  
✅ **Validation** - Input validation for all attachment types  

---

## 📋 **Supported File Types**

- **PDF Documents** - `application/pdf`
- **Text Files** - `text/plain`
- **Word Documents** - `application/msword`
- **Images** - `image/jpeg`, `image/png`, `image/gif`
- **Spreadsheets** - `application/vnd.ms-excel`
- **Any File Type** - Specify appropriate `contentType`

---

## 🚨 **Important Notes**

1. **File Size Limit**: Keep attachments under 25MB for optimal delivery
2. **Base64 Encoding**: Recommended for web applications
3. **File Path**: Only works for files accessible to the server
4. **Rate Limiting**: 1-second delay between emails prevents spam issues
5. **Error Handling**: Failed emails are tracked and reported

---

## 🔧 **Troubleshooting**

### **Common Issues**

1. **Large File Attachments**
   - Solution: Compress PDFs or use cloud storage links

2. **Base64 Encoding Errors**
   - Solution: Ensure proper base64 encoding of file content

3. **File Path Not Found**
   - Solution: Use absolute paths or base64 content instead

4. **Email Delivery Issues**
   - Solution: Check SMTP configuration and file size limits

---

## 🚀 **Ready to Use!**

Your email service now supports **PDF attachments** for bulk assignment emails! 

**Perfect for:**
- ✅ MERN Stack Intern assignments
- ✅ Technical assessments
- ✅ Document distribution
- ✅ Multi-candidate communications

**Just prepare your PDF file, convert to base64, and send!** 🎉
