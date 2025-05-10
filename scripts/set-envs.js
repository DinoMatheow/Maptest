
const { writeFileSync, mkdirSync } =  require('fs');


require('dotenv').config();

const targetPath = './src/environments/environment.ts'
const targetPathDev = './src/environments/environment.development.ts'

const mapboxKEY = process.env['Map_BOX'];

if (!mapboxKEY){
  throw new Error('MapBOX is no set');
}

const envFileContent = `
export const environment = {
  mapboxkey : "${mapboxKEY}"
};


`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync( targetPath, envFileContent );
writeFileSync( targetPathDev, envFileContent );



