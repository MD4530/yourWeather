
class Weather {

    constructor(id, array) {
        this.id = id;
        this.array = array || [];
    }

    //getter
    getID() {
        return this.id;
    }

    getArray() {
        return this.array;
    }

    // filtering the array using the user mouse position. 
    eachClickInformation() {
        return this.array.hourly
            .filter((data, co) => {
                if (co === Number(this.getID())) {
                    return data;
                }
            });
    }

    // sort the temp using the array sort method
    sortTheTemp() {
        let sortArray;
        if (this.getID() === 'min') {
            sortArray = this.array.hourly.sort(function (a, b) {
                return a.temp - b.temp;
            });
            return (sortArray);
        } else {
            sortArray = this.array.hourly.sort(function (a, b) {
                return b.temp - a.temp;
            });
            return (sortArray);
        }
    }

}

export default Weather;
