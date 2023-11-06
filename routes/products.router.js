const express = require("express");
const products = require("../schemas/products.schema");
const router = express.Router();

//상품등록
router.post("/api/products", (req, res) => {
  const reqBodyJSON = req.body;
  const title = reqBodyJSON.title;
  const content = reqBodyJSON.content;
  const author = reqBodyJSON.author;
  const password = reqBodyJSON.password;

  if(!title || !content || !author || !password) {
    res.status(400)
    return res.json({
      errorMessage: '데이터 형식이 올바르지 않습니다.'
    });
  }

  const newProduct = new products({
    title: title,
    content: content,
    author: author,
    password: password,
  });
  newProduct.save();
  return res.json({
    "message": "판매 상품을 등록하였습니다."
  });
});

//상품 목록 조회
router.get("/api/products", async (req, res) => {
  const finds = await products.find({},'_id title author status createdAt');
  return res.json({
    "data": finds
  });
});

//상품 상세 조회
router.get("/api/products/:productId", async (req, res) => {
  // const finds = await products.findById(req.params.productId, '_id title content author status createdAt');
  // console.log(req.params.productId)
  if(!req.params.productId){
    res.status(400)
    return res.json({
      message : "데이터 형식이 올바르지 않습니다."
    })
  }
  try {
    const finds = await products.findById(req.params.productId, '_id title content author status createdAt');
    if (finds === null) {
      throw "not found";
    }
    return res.json({
      "data": finds
    });
  }catch{
    res.status(404)
    return res.json({
      message : "상품 조회에 실패하였습니다."
    })
  }

});

//상품 정보 수정
router.put("/api/products/:productId", async (req, res) => {
  if(!req.params.productId || !Object.keys(req.body).length){
    res.status(400)
    return res.json({
      message : "데이터 형식이 올바르지 않습니다."
    })
  }
  try {
    const productFind = await products.findById(req.params.productId);
    if (req.body.password === productFind.password) {
      await products.updateOne({ _id: req.params.productId }, req.body);
      return res.json({
        message: "상품 정보를 수정하였습니다."
      })

    } else {
      res.status(401).json({ message: "상품을 수정할 권한이 존재하지 않습니다." })
      return
    }

  } catch {
    res.status(404).json({ message: "상품 조회에 실패하였습니다." })
  }
  
});

//상품 삭제
router.delete("/api/products/:productId", async (req, res) => {
  if(!req.params.productId || !Object.keys(req.body).length){
    res.status(400)
    return res.json({
      message : "데이터 형식이 올바르지 않습니다."
    })
  }
  try {
    const productFind = await products.findById(req.params.productId);
    if (req.body.password === productFind.password) {
      await products.findOneAndDelete({ _id: req.params.productId });
      return res.json({
        message: "상품을 삭제하였습니다."
      })

    } else {
      res.status(401).json({ message: "상품을 삭제할 권한이 존재하지 않습니다." })
      return
    }

  } catch {
    res.status(404).json({ message: "상품 조회에 실패하였습니다." })
  }
});

module.exports = router;