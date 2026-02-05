// Script to convert PDF first pages to images
// This will extract the first page of each certificate PDF as a thumbnail

const fs = require('fs');
const path = require('path');

// For now, let's create a simple HTML viewer that renders PDFs
// Install pdf-to-img: npm install pdf-to-img

const { pdf } = require('pdf-to-img');

const certificatesDir = path.join(__dirname, 'public', 'certificates');
const thumbnailsDir = path.join(certificatesDir, 'thumbnails');

// Ensure thumbnails directory exists
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

const pdfFiles = [
  'Aws certificates.pdf',
  'C Language Certificates.pdf',
  'css certificate.pdf',
  'Frontend DEveloper Certificate.pdf',
  'Hackathon Certificates.pdf',
  'National Building Certificates.pdf',
  'Web Development with Chatgpt Certificate.pdf',
  'iit madras certificate.pdf'
];

async function convertPDFs() {
  for (const pdfFile of pdfFiles) {
    const pdfPath = path.join(certificatesDir, pdfFile);
    const outputName = pdfFile.replace('.pdf', '.png');
    const outputPath = path.join(thumbnailsDir, outputName);

    try {
      console.log(`Converting ${pdfFile}...`);
      const document = await pdf(pdfPath, { scale: 2 });
      
      // Get only first page
      const firstPage = (await document.getPage(1)).png;
      
      // Save the image
      fs.writeFileSync(outputPath, firstPage);
      console.log(`✓ Saved ${outputName}`);
    } catch (error) {
      console.error(`✗ Error converting ${pdfFile}:`, error.message);
    }
  }
  
  console.log('\nAll PDFs converted to thumbnails!');
}

convertPDFs().catch(console.error);
