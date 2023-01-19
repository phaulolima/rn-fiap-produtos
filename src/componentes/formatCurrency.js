import React from 'react';
import { Text } from 'react-native';

export default function FormatCurrency ({amount, decimalCount = 2, decimal = ",", thousands = ".",  R$ = true, style = {}  })  {
   
   function formatarMoeda() {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    
        const negativeSign = amount < 0 ? "-" : "";
    
        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
    
        let retorno = negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
       
        if (R$) {
          retorno = 'R$ ' + retorno;
        } else {
          retorno;
        }
        
       
        return retorno
      } catch (e) {
        console.log(e)
      }
   }
  

    return <>
        <Text style={style}>{formatarMoeda()}</Text>
    </>

  };