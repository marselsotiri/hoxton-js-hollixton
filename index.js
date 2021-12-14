const state = {
    store: [],
    // selecteditem = null
  }
  
  // Q: Which type of items should we show?
  // A: ❌
  
  // SERVER FUNCTIONS
  
  // getStoreItems :: () => Promise<store>
  function getStoreItems() {
    return fetch('http://localhost:3000/store').then(resp => resp.json())
  }
  
  // HELPER FUNCTIONS
  
  // isItemNew :: (product: object) => boolean
  // returns true if the item was added less than or 10 ago
  // returns false if the item was added more than 10 days
  function isItemNew(product) {
    const daysToConsider = 11
  
    // check how many ms are there in 10 days
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24
  
    const msForTenDaysAgo = Date.now() - day * daysToConsider
  
    // get ms for current product
    const msForProductDate = Date.parse(product.dateEntered)
  
    // check if the product ms is more recent than 10 days ago
    return msForProductDate > msForTenDaysAgo
  }
  
  /*
  <header>
      <h1 class="logo">Hollixton</h1>
      <nav class="header__left">
        <ul class="header__left__list">
          <li class="header__left__item"><a>Girls</a></li>
          <li class="header__left__item"><a>Guys</a></li>
          <li class="header__left__item"><a>Sale</a></li>
        </ul>
      </nav>
      <nav class="header__right">
        <ul class="header__right__list">
          <li class="header__right__item"><button>🔍</button></li>
          <li class="header__right__item"><button>🤦‍♀️</button></li>
          <li class="header__right__item"><button>👜</button></li>
        </ul>
      </nav>
  </header>
  */
  
  function renderHeader() {
    const headerEl = document.createElement('header')
  
    const h1El = document.createElement('h1')
    h1El.textContent = 'Hollixton'

    const navItemLeft = document.createElement('nav')
    navItemLeft.setAttribute('class', 'header__left')
    const ulheaderLeft = document.createElement('ul')
    ulheaderLeft.setAttribute('class', 'header__left__list')


    const liGirls = document.createElement('li')
    liGirls.setAttribute('class', 'header__left__item')
    const aGirl = document.createElement('a')
    aGirl.textContent = 'Girls'
    liGirls.append(aGirl)

    const liBoys = document.createElement('li')
    liBoys.setAttribute('class', 'header__left__item')
    const aBoys = document.createElement('a')
    aBoys.textContent = 'Boys'
    liBoys.append(aBoys)

    const liSale = document.createElement('li')
    liSale.setAttribute('class', 'header__left__item')
    const aSale = document.createElement('a')
    aSale.textContent = 'Sale'
    liSale.append(aSale)

    ulheaderLeft.append(liGirls, liBoys, liSale)
    
    navItemLeft.append(ulheaderLeft)

//     <nav class="header__right">
//     <ul class="header__right__list">
//       <li class="header__right__item"><button>🔍</button></li>
//       <li class="header__right__item"><button>🤦‍♀️</button></li>
//       <li class="header__right__item"><button>👜</button></li>
//     </ul>
//   </nav>

    const navItemRight = document.createElement('nav')
    navItemRight.setAttribute('class', 'header__right')
    const ulheaderRight = document.createElement('ul')
    ulheaderRight.setAttribute('class', 'header__right__list')


    const liSearch = document.createElement('li')
    liSearch.setAttribute('class', 'header__right__item')
    const btnSearch = document.createElement('button')
    btnSearch.textContent = '🔍'
    liSearch.append(btnSearch)

    const liUser = document.createElement('li')
    liUser.setAttribute('class', 'header__right__item')
    const btnUser = document.createElement('button')
    btnUser.textContent = '🤦'
    liUser.append(btnUser)

    const liCart = document.createElement('li')
    liCart.setAttribute('class', 'header__right__item')
    const btnCart = document.createElement('button')
    btnCart.textContent = '👜'
    liCart.append(btnCart)

    ulheaderRight.append(liSearch, liUser, liCart)

    navItemRight.append(ulheaderRight)

    
    headerEl.append(h1El, navItemLeft, navItemRight)
  
    document.body.append(headerEl)
  }



  
  function renderProductItem(product, productList) {
    const productEl = document.createElement('li')
    productEl.setAttribute('class', 'product-item')
  
    const imgEl = document.createElement('img')
    imgEl.setAttribute('class', 'product-item__image')
    imgEl.setAttribute('src', product.image)
    imgEl.setAttribute('alt', product.name)
  
    const titleEl = document.createElement('h3')
    titleEl.setAttribute('class', 'product-item__title')
    titleEl.textContent = product.name
  
    const priceEl = document.createElement('p')
    priceEl.setAttribute('class', 'product-item__price')
  
    const fullPriceSpan = document.createElement('span')
    fullPriceSpan.setAttribute('class', 'product-item__full-price')
    fullPriceSpan.textContent = `£${product.price}`
  
    priceEl.append(fullPriceSpan)
  
    // if there is a discount available
    if (product.discountedPrice) {
      // add a class to the full price for alternative styling
      fullPriceSpan.classList.add('discounted')
  
      // create and add the discount span
      const discountSpan = document.createElement('span')
      discountSpan.setAttribute('class', 'product-item__discount')
      discountSpan.textContent = `£${product.discountedPrice}`
      priceEl.append(discountSpan)
    }
  
    productEl.append(imgEl, titleEl, priceEl)
  
    if (isItemNew(product)) {
      const newEl = document.createElement('span')
      newEl.setAttribute('class', 'product-item__new')
      newEl.textContent = 'NEW!'
      productEl.append(newEl)
    }
  
    productList.append(productEl)
  }
  
  function renderMain() {
    const mainEl = document.createElement('main')
  
    const h2El = document.createElement('h2')
    h2El.textContent = 'Home'
    h2El.setAttribute('class', 'main-title')
  
    const productList = document.createElement('ul')
    productList.setAttribute('class', 'product-list')
  
    for (const product of state.store) {
      renderProductItem(product, productList)
    }
  
    mainEl.append(h2El, productList)
  
    document.body.append(mainEl)
  }
  
  /* 
  <footer>
    <h2>Hollixton</h2>
    <div>
      <img />
      <span>United Kingdom</span>
    </div>
  </footer>
  */
  
  function renderFooter() {
    const footerEl = document.createElement('footer')
  
    const h2El = document.createElement('h2')
    h2El.textContent = 'Footer'

    const divEl = document.createElement('div')

    const imgFlag = document.createElement('img')
    imgFlag.setAttribute('src', '')

    const spanFlag = document.createElement('span')
    spanFlag.textContent = 'United Kingdom'

    divEl.append(imgFlag, spanFlag)


  
    footerEl.append(h2El, divEl)
  
    document.body.append(footerEl)
  }
  
  function render() {
    document.body.innerHTML = ''
  
    renderHeader()
    renderMain()
    renderFooter()
  }
  
  function init() {
    render()
    getStoreItems().then(function (store) {
      state.store = store
      render()
    })
  }
  
  init()
  