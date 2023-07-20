import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10`)
    const data = await res.json()

    console.log(data);

    if (data && data.products) {
      setProducts(data.products)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 2 && selectedPage !== page) {
      setPage(selectedPage)
    }
  }
  const showWelcome = page === 1; // Define showWelcome based on the current page
  return (
    <footer>
    <div>
    {showWelcome && <div className="welcome">Welcome</div>}
      {products.length > 0 && <div className="products">
        {products.slice(page * 2 - 2, page * 2).map((prod) => {
          return <span className="products__single" key={prod.id}>
            <img src={prod.thumbnail} alt={prod.title} /> {/* alt is imp */}
            <span>
              {prod.title}
            </span>
          </span>
        })}
      </div>}

      {products.length > 0 && <div className="pagination">
        <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "pagination__disable"}>previous</span>

        {[...Array(products.length / 2)].map((_, i) => {
          return <span key={i} className={page === i + 1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
        })}

        <span onClick={() => selectPageHandler(page + 1)} className={page < products.length / 2 ? "" : "pagination__disable"}>next</span>
      </div>}
    </div>
    </footer>
  );
}

export default App;
