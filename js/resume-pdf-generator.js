// Resume PDF Generator using jsPDF
// This function is called from the main script.js

// Download resume as PDF (using jsPDF)
async function downloadResumePDF() {
  // Check if resume has content
  if (!resumeData.personal.fullName) {
    alert('Please complete the resume builder first!');
    return;
  }
  
  try {
    const { jsPDF } = window.jspdf;
    
    // Get the resume preview content
    const resumeContent = document.getElementById('resumePreviewContent');
    
    // Show loading message
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-2xl z-50';
    loadingMsg.innerHTML = '<p class="text-lg font-semibold">📄 Generating PDF...</p>';
    document.body.appendChild(loadingMsg);
    
    // Use html2canvas to capture the resume content
    const canvas = await html2canvas(resumeContent, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10;
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    
    // Download the PDF
    const fileName = `${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
    pdf.save(fileName);
    
    // Remove loading message
    document.body.removeChild(loadingMsg);
    
    alert(`✅ Resume downloaded as ${fileName}`);
  } catch (error) {
    console.error('PDF generation error:', error);
    alert('PDF generation encountered an issue. Alternative:\n\n1. Right-click on the preview\n2. Select "Print"\n3. Choose "Save as PDF"');
  }
}
