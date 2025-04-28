/**
 * Simple script to fix linting issues
 */
const fs = require('fs');
const path = require('path');

// Function to read a file
const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
};

// Function to write to a file
const writeFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error writing to file ${filePath}:`, error);
    return false;
  }
};

// Fix pages/my-letter.tsx unescaped entities
const fixMyLetterPage = () => {
  const filePath = path.join(__dirname, '../pages/my-letter.tsx');
  let content = readFile(filePath);
  
  if (content) {
    // Replace any unescaped single quotes with &apos;
    content = content.replace(/(?<![\\&])'/g, '&apos;');
    writeFile(filePath, content);
  }
};

// Fix LetterButton.tsx unused variables
const fixLetterButton = () => {
  const filePath = path.join(__dirname, '../components/LetterButton.tsx');
  let content = readFile(filePath);
  
  if (content) {
    // Comment out the unused variable declarations
    content = content.replace(
      /const createHeartShape/g, 
      '// Unused but kept for future reference\n// const createHeartShape'
    );
    
    content = content.replace(
      /const \[active, setActive\]/g, 
      '// Unused but kept for future reference\n// const [active, setActive]'
    );
    
    writeFile(filePath, content);
  }
};

// Fix LetterButtonContainer.tsx any type
const fixLetterButtonContainer = () => {
  const filePath = path.join(__dirname, '../components/LetterButtonContainer.tsx');
  let content = readFile(filePath);
  
  if (content) {
    // Replace any with a more specific type
    content = content.replace(/error: any/g, 'error: Error | unknown');
    writeFile(filePath, content);
  }
};

// Main execution
console.log('Starting linting fixes...');
fixMyLetterPage();
fixLetterButton();
fixLetterButtonContainer();
console.log('Completed linting fixes'); 