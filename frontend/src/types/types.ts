export type JwtPayload = {username : string , sub : number , iat : number , exp : number}
export type Question = {answer : string , content : string , id : number , media_url : string , propositions : Proposition[], type : string}
export type Proposition  = {content : string , id : number }
