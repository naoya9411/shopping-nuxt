import Router from 'express-promise-router'
import itemsList from './items.json'

export type Item = {
  id: number
  name: string
  description?: string
  price: number
  shipping: number
  producer: string
  imageUrl1?: string
  imageUrl2?: string
  imageUrl3?: string
}

export type PersonalInfo = {
  sameAddress: boolean
  orderer: {
    firstName: string
    lastName: string
    postalCode: string
    prefecture: string
    address: string
    phoneNumber: string
    email: string
  }
  delivery: {
    firstName: string
    lastName: string
    firstNameKana: string
    lastNameKana: string
    prefecture: string
    address: string
    phoneNumber: string
  }
  payment: 'onDelivery' | 'conveni'
}

export type CartItem = {
  item: Item
  number: number
}

export function createApi() {
  const router = Router()

  router.get('/item-detail/:itemId', (req, res) => {
    const items: Item[] = itemsList
    items.forEach((item) => {
      if (item.id === Number(req.params.itemId)) {
        res.send(item)
      }
    })
  })

  router.post('/add-cart', (req, res) => {
    const items: Item[] = itemsList
    if (req.session) {
      if (!req.session.cartList) {
        req.session.cartList = []
      }

      items.forEach((i) => {
        if (i.id === Number(req.body.itemId)) {
          req.session.cartList.push({ item: i, number: req.body.number })
        }
      })
      res.send('succsess')
    }
  })

  router.get('/itemlist', (_req, res) => {
    const items: Item[] = itemsList

    res.send(items)
  })

  router.get('/cart', (req, res) => {
    res.send(req.session.cartList)
  })

  router.post('/address', (req, res) => {
    req.session.personalInfo = req.body
    res.send('success')
  })

  router.get('/address', (req, res) => {
    res.send(req.session.personalInfo)
  })

  router.get('/orderinfo', (req, res) => {
    let paymentName = ''
    if (req.session.personalInfo.payment === 'onDelivery') {
      paymentName = '代金引換'
    } else if (req.session.personalInfo.payment === 'conveni') {
      paymentName = 'コンビニ払い'
    }

    let itemAmount = 0
    let shippingAmount = 0
    req.session.cartList.forEach((val) => {
      itemAmount += val.item.price
      shippingAmount += val.item.shipping
    })
    const ret = {
      cartList: req.session.cartList,
      personalInfo: { ...req.session.personalInfo, payment: paymentName },
      itemAmount,
      shippingAmount,
    }
    res.send(ret)
  })

  router.get('/payment', (req, res) => {
    req.session.destroy((err) => {
      console.log(err)
    })
    res.send()
  })

  return router
}
