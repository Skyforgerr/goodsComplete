 package com.skyforger.goods.controller;

 import com.skyforger.goods.repository.GoodRepository;
 import com.skyforger.goods.requests.GoodRequest;
 import org.json.JSONObject;
 import org.springframework.beans.factory.annotation.Autowired;
 import com.skyforger.goods.model.Good;
 import org.springframework.web.bind.annotation.*;

 import com.skyforger.goods.service.GoodService;

 import java.util.List;

 @RestController
 @RequestMapping("/goods")
 @CrossOrigin
 public class GoodController {
     @Autowired
     private GoodService goodService;

     @Autowired
     private GoodRepository goodRepository;

     int amountOfElementsOnPage = 10;

      @PostMapping("/add")
      public String addGood(@RequestBody GoodRequest request){
          Good good = Good.builder()
                  .name(request.getName())
                  .cost(request.getCost())
                  .description(request.getDescription())
                  .amount(request.getAmount())
                  .build();
          goodService.saveGood(good);
          return "redirect:goods/view";
      }

      @DeleteMapping("/del")
      @CrossOrigin(origins = "*")
      public String deleteGood(@RequestParam Long goodId){
          goodRepository.deleteById(goodId);
          return "redirect:goods/view";
      }

      @GetMapping("/view")
      public List<Good> viewAllGoods(){
          return goodService.getAllGoods();
      }


     @GetMapping("/search")
     @CrossOrigin
     public String goodsSearch(@RequestParam(required = false) String name){
         String message = "";
         JSONObject jsonObject = new JSONObject();

         if (name != null && !name.isEmpty()){
             List<Good> goods = goodService.findByName(name);
             if (goods.size() != 0){
                 //jsonObject.put("maxPage", ((goods.size()%amountOfElementsOnPage == 0)? goods.size()/amountOfElementsOnPage : goods.size()/amountOfElementsOnPage + 1));
                 jsonObject.put("goods", goods);
                 message = jsonObject.toString();
             } else{
                 jsonObject.put("goods", goods);
                 jsonObject.put("query", "false");
                 message = jsonObject.toString();
             }
         } else {
             jsonObject.put("goods", goodService.getAllGoods());
             message = jsonObject.toString();
         }

         return message;
     }



 }
