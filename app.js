const elChiffre = document.querySelectorAll('.chiffre');
const elOperateurs = document.querySelectorAll('.operateur');
const elVirgule = document.querySelector('.virgule');
const elEgal= document.querySelector('.egal');
const elClear= document.querySelector('.clear');
const elDelete= document.querySelector('.delete');
const elAffichage= document.querySelector('.affichage');
const elAffichageHistoriqueRight= document.querySelector('.affichageHistoriqueRight');
const elAffichageHistoriqueBottom= document.querySelector('.affichageHistoriqueBottom');
let total;
let chaine = '';

elChiffre.forEach(chiffre => {chiffre.addEventListener('click', saisieChiffre)});
elOperateurs.forEach(operateur => {operateur.addEventListener('click', saisieOperateur)});
elVirgule.addEventListener('click', saisieVirgule);
elEgal.addEventListener('click', saisieEgal);
elClear.addEventListener('click', saisieClear);
elDelete.addEventListener('click', saisieDelete);
document.addEventListener('keydown', saisieNumPad)



const regexOperateur = new RegExp(/[+]|[-]|[÷]|[x]/g);
const regDigit = new RegExp(/\d/);
const regexPercent = new RegExp(/[%]/g);
const regexOperateurPrioritaire = new RegExp(/[÷]|[x]/);

function saisieChiffre(e){
    chaine += e.target.value;
    chaine = correctionZero(chaine);
    elAffichage.textContent = chaine;
};

function saisieOperateur(e){        
    if (chaine === ''){
        chaine = total
    }  
    chaine += e.target.value;
    chaine = correctionDoublonOperateurs(chaine);
    elAffichage.textContent = chaine;
    
};
function saisieVirgule(e){
    chaine += e.target.value;
    chaine = correctionDoublonVirgule(chaine);
    elAffichage.textContent = chaine;
}

function saisieEgal(){
    total = calcul(chaine);
    affichageResultat(total)    
}

function affichageResultat(total){
    
    if (isNaN(total) ){
        elAffichage.textContent = "Erreur de syntaxe";
        total = '';
        chaine = '';
    }else{
        let totalAffiche = 0;
        if (!Number.isInteger(total) && total.toString().split(".")[1].length > 5){
            totalAffiche = total.toFixed(5);
        }else{
            totalAffiche = total;
        }
        const eltotal = document.createElement('p');
        eltotal.innerHTML = `= ${totalAffiche}`;
        const elDivTotal = document.createElement('div');
        elDivTotal.classList.add('droite');
        elDivTotal.append(eltotal);      
        const elCalcul = document.createElement('p');
        elCalcul.classList.add('gauche');
        elCalcul.innerHTML = `${chaine}`;

        if (window.matchMedia("(min-width: 600px)").matches) {
            //on va remplir l'historique de droite
            elAffichageHistoriqueRight.prepend(elCalcul,elDivTotal);
          } else {
            //sinon ce sera l'historique de gauche
            elAffichageHistoriqueBottom.prepend(elCalcul,elDivTotal);
          }
        elAffichage.textContent = totalAffiche; 

        chaine = '';
        //ou chaine = totalAffiche;
    }
}

function saisieClear(){
    chaine = '';
    elAffichage.textContent = '';
}

function saisieDelete(){
    let tabChaine = chaine.split('');
    tabChaine.pop();
    chaine = tabChaine.join('');
    elAffichage.textContent = chaine;
}

function correctionDoublonVirgule(chaine){
    let tabChiffre = chaine.split(regexOperateur);    
    let dernierBloc = tabChiffre[tabChiffre.length-1];  
    let compteur = 0;
    for (let caract of dernierBloc){
        if (caract === '.') compteur++;
    }
    if (compteur === 2){
        let tabChaine = chaine.split('');
        tabChaine.pop();
        return tabChaine.join('');
    }
    return chaine;
}

function correctionDoublonOperateurs(chaine){ 
    let tabChaine = chaine.split('');
    let avantDerniereValeur = tabChaine[tabChaine.length-2];
    let derniereValeur = tabChaine[tabChaine.length-1];
    
    if (regDigit.test(avantDerniereValeur)) return tabChaine.join('');
    if (avantDerniereValeur === derniereValeur || (regexOperateur.test(avantDerniereValeur) && derniereValeur === '%')){
        tabChaine.pop();
        return tabChaine.join('');
    }else{
        tabChaine.splice(tabChaine.length-2, 1);
        return tabChaine.join('');
    }
}

function correctionZero(chaine){        
    if (chaine != '0'){
        let tabChiffre = chaine.split(regexOperateur);
        let blocVerif = tabChiffre[tabChiffre.length-1] ;
        if (blocVerif != '0'){
            let tabBlocVerif = blocVerif.split('');   
            if (regDigit.test(tabBlocVerif[tabBlocVerif.length-1]) && tabBlocVerif[0] === '0' && tabBlocVerif[1] != '.'){                
                let tabChaine = chaine.split('');
                tabChaine.splice(tabChaine.length-2,1,tabChaine[tabChaine.length-1]);
                tabChaine.pop();
                return tabChaine.join('');
            }
        }                       
    }
    return chaine;      
}

function saisieNumPad(e){
    const code = e.code
    switch (code){
        case'Numpad0' :
        chaine += '0'
        chaine = correctionZero(chaine);
        elAffichage.textContent = chaine;
        break
        case'Numpad1' :
        chaine += '1'
        elAffichage.textContent = chaine;
        break
        case'Numpad2' : 
        chaine += '2'
        elAffichage.textContent = chaine;
        break;
        case'Numpad3' : 
        chaine += '3'
        elAffichage.textContent = chaine;
        break
        case'Numpad4' : 
        chaine += '4'
        elAffichage.textContent = chaine;
        break;
        case'Numpad5' : 
        chaine += '5'
        elAffichage.textContent = chaine;
        break
        case'Numpad6' : 
        chaine += '6'
        elAffichage.textContent = chaine;
        break;
        case'Numpad7' : 
        chaine += '7'
        elAffichage.textContent = chaine;
        break;
        case'Numpad8' : 
        chaine += '8'
        elAffichage.textContent = chaine;
        break;
        case'Numpad9' : 
        chaine += '9'
        elAffichage.textContent = chaine;
        break;
        case'NumpadAdd' : 
        chaine += '+'
        chaine = correctionDoublonOperateurs(chaine);
        elAffichage.textContent = chaine;
        break;
        case'NumpadSubtract' : 
        chaine += '-'
        chaine = correctionDoublonOperateurs(chaine);
        elAffichage.textContent = chaine;
        break;
        case'NumpadMultiply' : 
        chaine += 'x'
        chaine = correctionDoublonOperateurs(chaine);
        elAffichage.textContent = chaine;
        break;
        case'NumpadDivide' : 
        chaine += '÷'
        chaine = correctionDoublonOperateurs(chaine);
        elAffichage.textContent = chaine;
        break;
        case'NumpadEnter' : 
        total = calcul(chaine);
        affichageResultat(total)
        break;
        case'NumpadDecimal' : 
        chaine += '.'
        chaine = correctionDoublonVirgule(chaine);
        elAffichage.textContent = chaine;
        break;
        case'Backspace' : 
        saisieDelete()
        break;
        case'Delete' :
        saisieClear()
        break;
    }
}

function calcul(chaine){

    let tabChiffre = chaine.split(regexOperateur);
    let tabOperateur = chaine.match(regexOperateur);
    //s'il y a des opérateurs prioritaires dans le tableau:
    while (regexOperateurPrioritaire.test(tabOperateur)){
        //on trouve le premier index d'un '*' ou d'un '/'
        const index = tabOperateur.findIndex(value => regexOperateurPrioritaire.test(value));
        let calculPrioritaire;
        //si c'est une multiplication
        if (tabOperateur[index] === 'x'){            
            calculPrioritaire = tabChiffre[index] * tabChiffre[index+1];
        }else{
            //sinon c'est une division :
            calculPrioritaire = tabChiffre[index] / tabChiffre[index+1];
        }
        //pour modifier tabOperateur : 
        tabOperateur.splice(index, 1);
        //et pour modifier tabChiffre : 
        tabChiffre.splice(index,2,calculPrioritaire);
    }
    //on récupère le premier chiffre...
    let resultat = Number(tabChiffre[0]);
    //..et on "shift" le tableau pour que sa longueur soit identique à celle de tabOperateur...
    tabChiffre.shift();
    //ainsi...
    for (let i =0; i<tabChiffre.length; i++){
        //calcul de la section poucentage
        if (regexPercent.test(tabChiffre[i])){            
            let chiffrePoucentage = tabChiffre[i].split(regexPercent).join('');
            let poucentage = chiffrePoucentage / 100 * resultat;
            tabChiffre.splice(i,1,poucentage);            
        }
        if (tabOperateur[i] === '+' ){
            resultat = resultat + Number(tabChiffre[i]);
        }else{
            resultat = resultat - Number(tabChiffre[i]);
        }        
    }
    return resultat;
}

