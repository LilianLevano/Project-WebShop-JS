import * as readline from 'node:readline/promises';
import{stdin as input, stdout as output} from 'node:process';
const userInput = readline.createInterface({input, output});

let mand = await veiligInvoerVulWinkelMand()

async function veiligInvoerVulWinkelMand(){

    let keuzeWinkel = ["Lenovo AR7", "HP-Omen", "Iphone 16", "Xiaomi 11"]
    let mand = []

    console.log("Dit zijn jouw keuzes: ")
    console.log(keuzeWinkel)
    let keuzeUser
    do{
        keuzeUser = await userInput.question("Wat wil je in jouw mand toevoegen ? Gebruik de correcte naam zonder fouten. Typ 'STOP' om te stoppen.\n--> ")
        keuzeUser = keuzeUser.trim().toLocaleLowerCase()
        console.log()
        switch(keuzeUser){
            case "lenovo ar7":
                mand.push("Lenovo AR7")
                console.log("Een Lenovo AR7 werd toegevoed aan jouw mand.")
                break
            case "hp-omen":
                mand.push("HP-Omen")
                console.log("Een HP-Omen werd toegevoed aan jouw mand.")

                break
            case "iphone 16":
                mand.push("Iphone 16")
                 console.log("Een Iphone 16 werd toegevoed aan jouw mand.")

                break
            case "xiaomi 11":
                mand.push("Xiaomi 11")
                console.log("Een Xiaomi 11 werd toegevoed aan jouw mand.")

                break
            case "stop":
                console.log("Je hebt de programma gestopt, dit zijn jouw producten: ")
                break
            default:
                console.log("Je hebt geen geldige keuze gemaakt, probeer opnieuw.")
        }
    }while(keuzeUser != "stop")

            return mand
}

console.log(mand)
console.log()


let isKorting = await bepaalKorting()

async function bepaalKorting(){
    let kortingIngeven = await userInput.question("Om een kortingsbon te verdienen, moet je bewijzen dat je een trouwe klant bent. Als je het bent, geef dan de geheime kortingscode.\n --> ")
    let isKorting = false
    

    if(kortingIngeven == "MEGAKORTING"){
            
            console.log("Proficiaat! Je krijgt een kortingsbon van 10% !")
            isKorting = true
        }else{
            
            console.log("Sorry, maar deze code is fout. Je krijgt geen korting.")
            isKorting = false
        }


    return isKorting

}

let prijsNaKorting = await berekenKorting(mand, isKorting)

async function berekenKorting(mand, isKorting){
    
    let prijsNaKorting
    let prijsMandVoorKorting = 0
    let prijsArtikel = 0
    let korting = 0.90



    for(let i = 0; i < mand.length; i++){
        switch(mand[i]){
            case "Lenovo AR7":
                
                prijsMandVoorKorting += 999
                break
            
            case "HP-Omen":
                
                prijsMandVoorKorting += 1500
                break
              
            case "Iphone 16":
                
                prijsMandVoorKorting += 1250
                break
                
            case "Xiaomi 11":
                
                prijsMandVoorKorting += 690
                break
                
        }
    }

    if(isKorting){
        prijsNaKorting = prijsMandVoorKorting * korting
        return prijsNaKorting
    }else{
        prijsNaKorting = prijsMandVoorKorting
        return prijsNaKorting
    }
}


console.log()
maakFactuur(mand, prijsNaKorting)

function maakFactuur(mand, prijsNaKorting){
    let prijsArtikel
    let factuur = { 
        artikels: []
        }
    for(let i = 0; i < mand.length; i++){
        switch(mand[i]){
            case "Lenovo AR7":
                
            prijsArtikel = 999
                factuur.artikels.push( {model: mand[i], prijsArtikel})

                break
            
            case "HP-Omen":
                
                prijsArtikel = 1500
                factuur.artikels.push( {model: mand[i], prijsArtikel})
                break
              
            case "Iphone 16":
                
                prijsArtikel = 1250
                factuur.artikels.push( {model: mand[i], prijsArtikel})
                break
                
            case "Xiaomi 11":
                
                prijsArtikel = 690
                factuur.artikels.push( {model: mand[i], prijsArtikel})
                break
                
        }
    }


    factuur.toonFactuur = function(model, prijsArtikel){

        let productPrijs = "Producten:" + " ".repeat(13) + "Prijs:"
        console.log(productPrijs)
        console.log("-".repeat(productPrijs.length))
        for(let i = 0; i < this.artikels.length; i++){
            console.log(this.artikels[i].model + " ".repeat(23 - this.artikels[i].model.length) + this.artikels[i].prijsArtikel + "€")
        }
        
        
    
    }
    

    factuur.toonFactuur()
    if(isKorting){
        console.log("Korting:" + " ".repeat(15) + "-10%")
    }
    console.log("Totaal:" + " ".repeat(16) + prijsNaKorting.toFixed(2) + "€")
}

process.exit()
