import { getWinesDataFromVivino } from '../utils/scrap_data';

class WineService {
  public getWinesData = async (name: string) => {
    const wines = await getWinesDataFromVivino(name);
    return wines;
  };
}

export default WineService;
