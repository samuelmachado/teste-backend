const veiculosJson = require('../../../veiculos.json')

const Fabricante = require('../models/Fabricante')
const Modelo = require('../models/Modelo')
const Unidade = require('../models/Unidade')
const Veiculo = require('../models/Veiculo')

class ImportController {
  async importarArquivo (req, res) {
    const modelos = new Set()
    const fabricantes = new Set()
    const unidades = new Set()
    const veiculos = new Set()

    try {
      for (let i = 0; i < veiculosJson.length; i++) {
        const v = veiculosJson[i]
        if (v.modelo.fabricante && !fabricantes.has(JSON.stringify(v.modelo.fabricante))) {
          fabricantes.add(JSON.stringify(v.modelo.fabricante))
          await Fabricante.create(v.modelo.fabricante)
        }
        delete v.modelo.fabricante

        if (!modelos.has(JSON.stringify(v.modelo))) {
          modelos.add(JSON.stringify(v.modelo))
          const m = v.modelo
          await Modelo.create({
            id: m.id,
            modelo: m.modelo,
            imagem: m.imagem,
            fabricante_id: m.idFabricante
          })
        }
        delete v.modelo

        if (!unidades.has(v.idUnidade)) {
          unidades.add(v.idUnidade)
          await Unidade.create({ id: v.idUnidade })
        }

        if (!veiculos.has(v)) {
          unidades.add(v)
          await Veiculo.create(
            {
              id: v.id,
              unidade_id: v.idUnidade,
              modelo_id: v.idModelo,
              placa: v.placa,
              cor: v.cor
            })
        }
      }
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao importar os dados' })
    }
    res.status(201).json({ msg: 'Dados importados com sucesso.' })
  }
}

module.exports = new ImportController()
