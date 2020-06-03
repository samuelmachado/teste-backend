import dataLoadService from "../sevice/DataLoadService"

class DataLoadController {
  async dataLoad (){
    const data = dataLoadService()

  }
}

export default new DataLoadController()