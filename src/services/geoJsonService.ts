import axios from 'axios';


export class GeoJsonService {

    constructor() {

    }

    private async loadJsonFile(geoJsonFile: string) {

        let res = await axios.get(`http://localhost:3000/${geoJsonFile}`);

        let data = res.data;
        return data;
    }


    async getStates(stateName: string) {

        let states: any = await this.loadJsonFile(stateName);  

        let names: string[] = [];
        let coordinates: any = [];

        states.map((item : any) => {
            names.push(item.properties.Parliament)
        })
       
      
 
        const arr = [names, states]
        return arr

    }


    getStateDuns(stateName: string) {

        let geoJsonFile = stateName + "-geoJson.json";
        let geoJson: any = this.loadJsonFile(geoJsonFile);


        let result: string[] = [];

        geoJson.array.forEach((element: any) => {
            result.push(element.Properties.Name)
        });

        return result;

    }

    getStateDunsGeoJson(stateName: string) {

        let geoJsonFile = stateName + "-geoJson.json";
        let geoJson = this.loadJsonFile(geoJsonFile);
    }


}



