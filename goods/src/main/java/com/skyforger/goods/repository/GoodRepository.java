 package com.skyforger.goods.repository;

 import com.skyforger.goods.model.Good;
 import org.springframework.data.jpa.repository.JpaRepository;
 import org.springframework.data.jpa.repository.Query;
 import org.springframework.data.repository.query.Param;
 import org.springframework.stereotype.Repository;

 import java.util.List;

 @Repository
 public interface GoodRepository extends JpaRepository<Good, Long>{ //исправил на Long, возможны ошибки
  @Query("""
         SELECT g FROM Good g WHERE LOWER(g.name) LIKE CONCAT('%', LOWER(:name), '%')
         """)
  List<Good> searchByName(@Param("name") String name);

  List<Good> findById(long id);
 }
