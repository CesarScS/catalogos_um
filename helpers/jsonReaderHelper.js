const fs = require('fs');
const path = require('path');
const alasql = require('alasql')

const readerHelper = {};

readerHelper.GetByZip = (zip) => {
    return new Promise((resolve, reject) => {
        // Ruta al archivo JSON
        const jsonFilePath = path.join(__dirname, '../resultado.json');

        // Leer el archivo JSON
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo JSON:', err);
                reject(err); // Rechazar la promesa en caso de error
                return;
            }
            
            // Parsear el archivo JSON
            const jsonData = JSON.parse(data);
            
            // Realizar una consulta SQL sobre el JSON
            const query = `SELECT * FROM ? WHERE [Código_Postal] = ${zip}`;
            const result = alasql(query, [jsonData]);
            
            var datas = [] 
            console.log('resultados negativos', result.length)
            if(result.length === 0){
                console.log('ENTRO!!!')
                return resolve(null);
            }
            var colonias = result.map(item => {
                return {
                    Clave_localidad : item['Clave_localidad'],
                    Descripción_de_localidad : item['Descripción_de_localidad'],
                    Clave_colonia : item['Clave_colonia'],
                    Descripción_de_colonia : item['Descripción_de_colonia']
                }
            })

            const response = {
                Clave_de_entidad_federativa:result[0]['Clave_de_entidad_federativa'],
                Descripción_de_entidad_federativa:result[0]['Descripción_de_entidad_federativa'],
                Clave_de_delegación_municipio:result[0]['Clave_de_delegación_municipio'],
                Descripción_de_delegación_municipio:result[0]['Descripción_de_delegación_municipio'],
                Código_Postal:result[0]['Código_Postal'],
                colonias
            }

            resolve(response); // Resolver la promesa con el resultado
        });
    });
}

module.exports = readerHelper;
