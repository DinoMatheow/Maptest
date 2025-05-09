
const { writeFileSync, mkdirSync } =  require('fs');


require('dotenv').config();

const targetPath = './src/environments/environments.ts'
const targetPathDev = './src/environments/environments.development.ts'

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



