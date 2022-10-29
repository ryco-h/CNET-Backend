const fs = require('fs');
const Game = require('./Game');

class Model {

   static async find() {
      
      return await new Promise((resolve, reject) => {
         fs.readFile(`./dataJSON/${this.model}.json`, (err, data) => {
            if (err) {
               reject(err);
            } else {
               resolve(JSON.parse(data));
            }
         })
      });
   }

   static async findOne({id}) {
      let data = await this.find()
      data = data.filter(data => data.id === id)

      return data
   }

   static async findOneAndUpdate({id, newObject}) {

   }

   async save() {

      return await new Promise((resolve, reject) => {
         fs.readFile(`./dataJSON/${this.model}.json`, 'utf-8', (err, data) => {
            if (err) {
               reject(err);
            } else {
               if(!JSON.parse(data).map(game => game.id).includes(this.id)) {
                  let model = this.model
   
                  const dataToSave = JSON.parse(data)
                  delete this.model
                  dataToSave.push(this)
   
                  fs.writeFile(`./dataJSON/${model}.json`, JSON.stringify(dataToSave, null, 3), (err, data) => {
                     if (err) {
                        reject(err)
                     } else {
                        resolve(dataToSave)
                     }
                  })
               } else {
                  resolve({
                     message: `ID's existed`,
                     success: false,
                     status: 400,
                     reason: 'Duplication'
                  })
               }
            }
         })
      });
   }
}

// module.exports = Model;