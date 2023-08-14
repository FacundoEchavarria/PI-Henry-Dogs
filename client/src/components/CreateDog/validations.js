const validation = (dog) => {
    const validationDogName = new RegExp(/^[a-zA-Z]+$/)
    const validationImgUrl = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/)
    const onlyNumbers = new RegExp(/^[0-9]+$/) ;

    let errors = {
        incomplete: true
    };
    dog.altura_1 = parseInt(dog.altura_1)
    dog.altura_2 = parseInt(dog.altura_2)
    dog.peso_1 = parseInt(dog.peso_1)
    dog.peso_2 = parseInt(dog.peso_2)
    dog.life_span_1 = parseInt(dog.life_span_1)
    dog.life_span_2 = parseInt(dog.life_span_2)

    if(dog.name && (dog.name.length < 3 || dog.name.length > 25)) errors.name = '*The dog´s name must be bettwen 3 an 25 characters'
    else if(dog.name && !validationDogName.test(dog.name)) errors.name = '*The dog´s name must be only letters'

    if(dog.imagen && (!validationImgUrl.test(dog.imagen))) errors.imagen = '*The image must be an URL'
    
    if((dog.altura_1 && dog.altura_2) && (!onlyNumbers.test(dog.altura_1) || !onlyNumbers.test(dog.altura_2))) errors.altura = '*The height must be a number'
    else if((dog.altura_1 && dog.altura_2) && dog.altura_1 > dog.altura_2) errors.altura = '*The first value must be lower than the second value'

    if( (dog.peso_1 && dog.peso_2) && (!onlyNumbers.test(dog.peso_1) || !onlyNumbers.test(dog.peso_2))) errors.peso = '*The weight must be a number'
    else if((dog.peso_1 && dog.peso_2) && dog.peso_1 > dog.peso_2) errors.peso = '*The first value must be lower than the second value'

    if((dog.life_span_1 && dog.life_span_2) && (!onlyNumbers.test(dog.life_span_1) || !onlyNumbers.test(dog.life_span_1))) errors.life_span = '*The height must be a number'
    else if((dog.life_span_1 && dog.life_span_2) && dog.life_span_1 > dog.life_span_2) errors.life_span = '*The first value must be lower than the second value'

    if(dog.temperament && (dog.temperament.length < 1 || dog.temperament.length > 6)) errors.temperament = '*Each dog can only have bettwen 1 and 6 temperaments'

    if(dog.name && dog.peso_1 && dog.peso_2 && dog.altura_1 && dog.altura_2 && dog.life_span_1 && dog.life_span_2 && dog.temperament) errors.incomplete = false

    return errors;
}

export default validation
