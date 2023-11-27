# Medieinstitutet-API-Photoalbum

## Betyg: VG

## Express, Prisma, Typescript, CRUD, MySQL

# Hygienkrav
Nedan hygienkrav ska vara uppfyllda oavsett betygsnivå.

All källkod ska vara skriven av dig själv

Använder Express och Prisma

Vara skriven i TypeScript

Följa REST, CRUD och Resource Controller mönster

Alla svar följer jSend-specifikationen

Autentisering via HTTP Basic/JWT med hashing/salting av lösenord via bcrypt

Validering av samtlig inkommande data

Följer angiven specifikation av endpoints (såväl http-metod som path, request och response)

Felhantering (t.ex. om användaren försöker komma åt en annan användares album eller foton, eller om användaren försöker lägga till ett foto som inte tillhör användaren i ett album, eller lägga till ett foto i ett album som inte finns)

Använder korrekta HTTP-statuskoder

All källkod vara korrekt indenterad (så klart!)

Publicerad på Cyclic/Clever Cloud

##Kravspecifikation
Obs! En användare ska bara kunna se sina egna album och foton, och enbart kunna lägga till sina egna foton i sina egna album.

 

#Användare
Registrera nytt konto

VG: Logga in för att få en JWT-token

 

#Foton
Lista sina foton

Skapa ett nytt foto

Uppdatera ett foto

VG: Radera ett foto (raderar även eventuella kopplingar mellan fotot och album som fotot finns i)

 

#Album
Lista sina album

Skapa nya album

Uppdatera ett album

VG: Radera ett album (raderar även eventuella kopplingar mellan albumet och fotona som finns i albumet)

 

#Album > Foton
Lista foton i ett album

Lägga till foto i ett album

VG: Lägga till flera foton i ett album

VG: Ta bort ett foto från ett album

 

#Kravspecifikation Väl Godkänt
Använder JWT istället för HTTP Basic Auth

Kan radera ett foto (tar även bort eventuella länkar mellan fotot och album)

Kan radera ett album (tar även bort eventuella länkar mellan albumet och foton)

Kan lägga till flera foto samtidigt till ett album

Kan ta bort ett foto från ett album

 
