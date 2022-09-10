
import React, {createContext} from 'react'

import {database } from '../Components/config/firebaseConfig'

export const ProductsContext = createContext()

export class ProductsContextProvider extends React.Component{
 
    state = {
        products : []
       
    }


    
    componentDidMount(){

        const prevProducts = this.state.products
        database.collection('Products').onSnapshot(snapshot => {
            let changes = snapshot.docChanges()
            changes.forEach(change => {
                if(change.type === 'added'){
                    prevProducts.push({
                        ProductId: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductUrl: change.doc.data().ProductUrl,
                        Description: change.doc.data().Description,

                    })
                }
                this.setState({
                    products: prevProducts
                })
            })
        })
    }


    

    render(){
        return(
             <ProductsContext.Provider value={{products: [...this.state.products]}}>
                {this.props.children}
             </ProductsContext.Provider >
        )
    }
}

