package com.example.cozyhaven.Service;
import com.example.cozyhaven.DTO.HotelDTO;
import com.example.cozyhaven.DTO.RoomDTO;
import com.example.cozyhaven.Entity.Hotel;
import com.example.cozyhaven.Entity.Review;
import com.example.cozyhaven.Entity.Room;
import com.example.cozyhaven.Entity.User;
import com.example.cozyhaven.Enum.Role;
import com.example.cozyhaven.Mapper.HotelMapper;
import com.example.cozyhaven.Mapper.RoomMapper;
import com.example.cozyhaven.Repository.HotelRepo;
import com.example.cozyhaven.Repository.ReviewRepo;
import com.example.cozyhaven.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HotelService {
    @Autowired
    private HotelRepo repo;

    @Autowired
    private ReviewRepo reviewRepo;

    @Autowired
    private UserRepo userRepo;

    public HotelDTO addHotel(HotelDTO hotel) {

        User owner=userRepo.findByUserIdAndRole(hotel.getOwnerId(), Role.OWNER);

        if(owner==null){
            return null;
        }

        Hotel h=HotelMapper.toEntity(hotel);
        h.setOwner(owner);
        h=repo.save(h);//here is the problem
        return HotelMapper.toDto(h);

    }

    public List<HotelDTO> showAllHotels() {

        List<Hotel>list=repo.findAll();
        List<HotelDTO> listDTO=new ArrayList<>();
        for(Hotel h:list){
            listDTO.add(HotelMapper.toDto(h));
        }
        return listDTO;
    }

    public HotelDTO searchHotelById(int id) {
        Hotel h= repo.findById(id).orElse(null);
        if(h==null){return null;}
        return HotelMapper.toDto(h);
    }

    public HotelDTO updateHotelById(int id, HotelDTO hotelDto) {

           Hotel h=HotelMapper.toEntity(hotelDto);
           h.setHotelId(id);//so that it wont create a new one
          h=repo.save(h);
           return HotelMapper.toDto(h);

    }
    public String deleteHotelById(int id) {
         repo.deleteById(id);
         return "Hotel has been deleted";
    }



    public List<HotelDTO> searchHotelByLocation(String location) {
        List<Hotel>list= repo.findAllByLocation(location);
        List<HotelDTO> listDTO=new ArrayList<>();
        for(Hotel h:list){
            listDTO.add(HotelMapper.toDto(h));
        }
        return listDTO;
    }

    public List<HotelDTO> searchHotelByOwnerId(int id) {
        List<Hotel>list= repo.findAllByOwner_UserId(id);
        List<HotelDTO> listDTO=new ArrayList<>();
        for(Hotel h:list){
            listDTO.add(HotelMapper.toDto(h));
        }
        return listDTO;
    }


}




