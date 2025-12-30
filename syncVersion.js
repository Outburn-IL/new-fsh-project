import fs from 'fs-extra';
import path from 'path';
import { readSushiConfig } from './utils.js';
import { execSync } from 'child_process';

const workingDir = path.resolve('.');
const packageJsonPath = path.join(workingDir, 'package.json');

const syncPackageVersion = () => {
    console.log('Checking package.json version sync...');
    
    const sushiConfig = readSushiConfig();
    const sushiVersion = sushiConfig?.version;
    
    if (!sushiVersion) {
        console.log('⚠️  No version found in sushi-config.yaml');
        return false;
    }
    
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const packageVersion = packageJson.version;
    
    if (sushiVersion === packageVersion) {
        console.log(`✅ Version in sync: ${sushiVersion}`);
        return true;
    }
    
    console.log(`⚠️  Version mismatch detected:`);
    console.log(`   sushi-config.yaml: ${sushiVersion}`);
    console.log(`   package.json:      ${packageVersion}`);
    console.log(`   Updating package.json...`);
    
    // Update package.json version
    packageJson.version = sushiVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`✅ Updated package.json to version ${sushiVersion}`);
    
    // Update package-lock.json
    try {
        console.log('   Updating package-lock.json...');
        execSync('npm install --package-lock-only', { stdio: 'pipe', cwd: workingDir });
        console.log(`✅ Updated package-lock.json`);
    } catch (e) {
        console.log(`⚠️  Failed to update package-lock.json: ${e.message}`);
    }
    
    return true;
};

syncPackageVersion();
