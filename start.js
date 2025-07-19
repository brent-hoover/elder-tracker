console.log('=== Start.js executing ===');
console.log('Current directory:', process.cwd());
console.log('Node version:', process.version);
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET'
});

// Check if files exist
const fs = require('fs');
const path = require('path');

const mainPath = path.join(__dirname, 'apps/backend/dist/src/main.js');
console.log('Checking for main.js at:', mainPath);
console.log('File exists:', fs.existsSync(mainPath));

if (!fs.existsSync(mainPath)) {
  console.log('Directory contents of apps/backend/dist/src:');
  const distPath = path.join(__dirname, 'apps/backend/dist/src');
  if (fs.existsSync(distPath)) {
    console.log(fs.readdirSync(distPath));
  } else {
    console.log('Directory does not exist');
  }
}

// Try to load the main app
try {
  console.log('Loading main application...');
  require('./apps/backend/dist/src/main');
} catch (error) {
  console.error('Failed to load main application:');
  console.error(error.message);
  console.error(error.stack);
  
  // If it's a module not found error, show what's missing
  if (error.code === 'MODULE_NOT_FOUND') {
    console.error('Missing module details:', error);
  }
  
  process.exit(1);
}