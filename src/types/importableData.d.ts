export default interface ImportableData {
  idUnidade: number
  idModelo: number
  placa: string
  cor: string
  modelo: {
    id: number
    idFabricante: number
    modelo: string
    imagem: string
    fabricante: {
      id: number
      nome: string
    }
  }
}
