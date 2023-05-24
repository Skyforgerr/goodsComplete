 package com.skyforger.goods.service;

 import com.skyforger.goods.model.Good;
 import org.springframework.data.jpa.repository.Query;
 import org.springframework.data.repository.query.Param;

 import java.util.List;

 public interface GoodService {
     public Good saveGood(Good good);
     public List<Good> getAllGoods();
     public List<Good> findByName(String name);
     public void deleteGood(int good_id);
 }
