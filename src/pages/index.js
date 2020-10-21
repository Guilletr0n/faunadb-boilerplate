import React from "react"
import { Link, graphql  } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import ContentEditable from '../components/ContentEditable'
import api from '../utils/api'
import isLocalHost from '../utils/isLocalHost'

function handleClick(e) {
  e.preventDefault();
  // Fetch all animals
    api.readAll().then((animals) => {
      if (animals.message === 'unauthorized') {
        if (isLocalHost()) {
          alert('FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info')
        } else {
          alert('FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct')
        }
        return false
      }

      console.log('all animals', animals)
      this.setState({
        animals: animals
      })
    })
}

const IndexPage = ({data}) => (
  // Client-side Runtime Data Fetching
  <Layout>
    <SEO title="Home" />
    <div style={{ maxWidth: `30px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <h2>Build time data from FaunaDB</h2>
    <h3>All Animals</h3>
    <ul>
     {data.allAnimals.nodes.map((element)=>{
       return(
       <li key={element.id}>{element.name}</li>
       )
     })}
    </ul>
    <h2>Client time data from FaunaDB</h2>
    <a href="http:localhost:8000" onClick={handleClick}>Fetch animals</a>
    <div className='todo-list-title'>
              <ContentEditable
                tagName='span'
              />
            </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)
export const query = graphql`
  query allAnimals {
    allAnimals {
      nodes {
        id
        type
        name
      }
    }
  }
`
export default IndexPage
