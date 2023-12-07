import dorits from './dorits.json';
import data from './mock.json'
export const mockResultByBrandId=(brandId)=>{
    if(brandId===1){
        return dorits;
    }else if(brandId===2){
        return data;
    }
}