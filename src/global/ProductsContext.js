
import React, {createContext} from 'react'

import {database } from '../Components/config/firebaseConfig'

export const ProductsContext = createContext()

export class ProductsContextProvider extends React.Component{
 
    state = {
        products : []
       
    }


    componentDidMount(){
        database.collection('Products')
                .get( )
                .then(snapshot => {
                    const products = []
                    snapshot.forEach(doc => {
                        const data = doc.data()
                        products.push(data)
                    })

                    this.setState({
                        products: products
                })

                //.catch(error => console.log(error))
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