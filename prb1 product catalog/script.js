const products = [
  {
    image: 'images/headphones.png',
    name: 'Wireless Headphones',
    price: '₹7,999',
    description: 'Noise-cancelling over-ear headphones.'
  },
  {
    image: 'images/smartwatch.png',
    name: 'Smartwatch',
    price: '₹12,999',
    description: 'Fitness tracking smartwatch.'
  },
  {
    image: 'images/mouse.png',
    name: 'Gaming Mouse',
    price: '₹2,499',
    description: 'Ergonomic gaming mouse.'
  },
  {
    image: 'images/laptopstand.png',
    name: 'Laptop Stand',
    price: '₹1,999',
    description: 'Adjustable aluminium stand.'
  },
  {
    image:'images/laptopstand.png',
    name:'Stand',
    price:'₹455141',
  },
  {
    image: 'images/headphones.png',
    name: 'Wireless Headphones',
    price: '₹7,999',
    description: 'Noise-cancelling over-ear headphones.'
  },
  {
    image: 'images/smartwatch.png',
    name: 'Smartwatch',
    price: '₹12,999',
    description: 'Fitness tracking smartwatch.'
  },
  {
    image: 'images/mouse.png',
    name: 'Gaming Mouse',
    price: '₹2,499',
    description: 'Ergonomic gaming mouse.'
  },
  {
    image: 'images/laptopstand.png',
    name: 'Laptop Stand',
    price: '₹1,999',
    description: 'Adjustable aluminium stand.'
  },
  {
    image:'images/laptopstand.png',
    name:'Stand',
    price:'₹455141',
  },
  {
    image: 'images/headphones.png',
    name: 'Wireless Headphones',
    price: '₹7,999',
    description: 'Noise-cancelling over-ear headphones.'
  },
  {
    image: 'images/smartwatch.png',
    name: 'Smartwatch',
    price: '₹12,999',
    description: 'Fitness tracking smartwatch.'
  },
  {
    image: 'images/mouse.png',
    name: 'Gaming Mouse',
    price: '₹2,499',
    description: 'Ergonomic gaming mouse.'
  },
  {
    image: 'images/laptopstand.png',
    name: 'Laptop Stand',
    price: '₹1,999',
    description: 'Adjustable aluminium stand.'
  },
  {
    image:'images/laptopstand.png',
    name:'Stand',
    price:'₹455141',
  }
];

let page = 1;
const rows = 10;

function displayProducts() {
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";
  const start = (page - 1) * rows;
  const paginatedItems = products.slice(start, start + rows);

  for (const p of paginatedItems) {
    tbody.innerHTML += `<tr>
      <td><img src="${p.image}" alt="${p.name}"></td>
      <td>${p.name}</td>
      <td>${p.price}</td>
      <td>${p.description}</td>
    </tr>`;
  }

  const totalPages = Math.ceil(products.length / rows);
  const paginationDiv = document.querySelector(".pagination");

  if (products.length > 10) {
    paginationDiv.style.display = "block";
    document.getElementById("pageInfo").textContent = `Page ${page} of ${totalPages}`;
    document.getElementById("prevBtn").disabled = page === 1;
    document.getElementById("nextBtn").disabled = page === totalPages;
  } else {
    paginationDiv.style.display = "none";
  } 
}

function changePage(direction) {
  page += direction;
  displayProducts();
}

displayProducts();
