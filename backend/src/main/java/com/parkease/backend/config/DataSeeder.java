package com.parkease.backend.config;

import com.parkease.backend.model.ParkingSlot;
import com.parkease.backend.model.User;
import com.parkease.backend.repository.ParkingSlotRepository;
import com.parkease.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataSeeder {

        @Bean
        CommandLineRunner initDatabase(ParkingSlotRepository slotRepository, UserRepository userRepository) {
                return args -> {
                        if (slotRepository.count() == 0) {
                                List<ParkingSlot> initialSlots = Arrays.asList(
                                                new ParkingSlot("TS-HYD-AMB-001", "Telangana", "Hyderabad",
                                                                "AMB Cinemas", "AMB Cinemas - L1",
                                                                false, "Car", 25, 35, false, true),
                                                new ParkingSlot("TS-HYD-AMB-002", "Telangana", "Hyderabad",
                                                                "AMB Cinemas", "AMB Cinemas - L1",
                                                                true, "Car", 25, 35, false, true),
                                                new ParkingSlot("TS-HYD-INO-001", "Telangana", "Hyderabad",
                                                                "Inorbit Mall", "Inorbit Mall - P1",
                                                                false, "Bike", 65, 55, false, true),
                                                new ParkingSlot("TS-HYD-INO-002", "Telangana", "Hyderabad",
                                                                "Inorbit Mall", "Inorbit Mall - P2",
                                                                false, "Car", 65, 55, false, true),
                                                new ParkingSlot("TS-HYD-NEX-001", "Telangana", "Hyderabad",
                                                                "Nexus Mall", "Nexus Mall - B1",
                                                                false, "Car", 45, 40, false, true),
                                                new ParkingSlot("TS-HYD-DSL-001", "Telangana", "Hyderabad",
                                                                "DSL Virtue Mall", "DSL Mall - P3",
                                                                true, "Car", 70, 20, false, true),
                                                new ParkingSlot("TS-WGL-ASN-001", "Telangana", "Warangal",
                                                                "Asian Cinemas",
                                                                "Asian Cinemas - Parking", false, "Car", 30, 30, false,
                                                                true),
                                                new ParkingSlot("TS-WGL-NIT-001", "Telangana", "Warangal",
                                                                "NIT Warangal",
                                                                "Guest House Parking", false, "Car", 55, 55, false,
                                                                true),
                                                new ParkingSlot("AP-VIZ-CMR-001", "Andhra Pradesh", "Vizag",
                                                                "CMR Central",
                                                                "CMR Central - Cellar", false, "Car", 40, 45, false,
                                                                true),
                                                new ParkingSlot("AP-VIZ-RKB-001", "Andhra Pradesh", "Vizag", "RK Beach",
                                                                "Beach Road Parking",
                                                                true, "Car", 80, 60, false, true),
                                                new ParkingSlot("AP-VIZ-VMR-001", "Andhra Pradesh", "Vizag",
                                                                "VMRDA Park", "VMRDA Main Gate",
                                                                false, "Bike", 35, 70, false, true),
                                                new ParkingSlot("AP-VIJ-PVP-001", "Andhra Pradesh", "Vijayawada",
                                                                "PVP Square",
                                                                "PVP Square - L2", false, "Bike", 60, 25, false, true),
                                                new ParkingSlot("AP-VIJ-TRN-001", "Andhra Pradesh", "Vijayawada",
                                                                "Trendset Mall",
                                                                "Trendset - C1", false, "Car", 50, 40, false, true),
                                                new ParkingSlot("AP-VIJ-BNZ-001", "Andhra Pradesh", "Vijayawada",
                                                                "Benz Circle",
                                                                "Public Parking", true, "Car", 20, 80, false, true),
                                                new ParkingSlot("AP-TPT-AIR-001", "Andhra Pradesh", "Tirupati",
                                                                "AIR Bypass",
                                                                "Bypass Road Parking", false, "Car", 40, 40, false,
                                                                true),
                                                new ParkingSlot("AP-TPT-SRI-001", "Andhra Pradesh", "Tirupati",
                                                                "Srinivasam", "Complex Parking",
                                                                false, "Car", 60, 60, false, true),
                                                new ParkingSlot("TN-CHE-EA-001", "Chennai", "Chennai", "Express Avenue",
                                                                "Express Avenue - B1",
                                                                true, "Car", 30, 60, false, true),
                                                new ParkingSlot("TN-CHE-PMC-001", "Chennai", "Chennai",
                                                                "Phoenix Marketcity",
                                                                "Phoenix Marketcity - B2", false, "Car", 75, 30, false,
                                                                true),
                                                new ParkingSlot("MUM-001", "Maharashtra", "Mumbai", "Phoenix Palladium",
                                                                "Phoenix Palladium",
                                                                false, "Car", 50, 50, false, true),
                                                new ParkingSlot("KA-BLR-UB-001", "Karnataka", "Bengaluru", "UB City",
                                                                "UB City - P1",
                                                                false, "Car", 30, 40, false, true),
                                                new ParkingSlot("KA-BLR-UB-002", "Karnataka", "Bengaluru", "UB City",
                                                                "UB City - P2",
                                                                true, "Car", 30, 40, false, true),
                                                new ParkingSlot("KA-BLR-PHO-001", "Karnataka", "Bengaluru",
                                                                "Phoenix Marketcity", "Phoenix - B3",
                                                                false, "Bike", 50, 70, false, true),
                                                new ParkingSlot("KL-KOC-LUL-001", "Kerala", "Kochi", "Lulu Mall",
                                                                "Lulu Mall - North",
                                                                false, "Car", 20, 30, false, true),
                                                new ParkingSlot("KL-KOC-LUL-002", "Kerala", "Kochi", "Lulu Mall",
                                                                "Lulu Mall - South",
                                                                false, "Car", 25, 30, false, true),
                                                new ParkingSlot("DL-DEL-CON-001", "Delhi", "New Delhi",
                                                                "Connaught Place", "Block-A Parking",
                                                                true, "Car", 45, 55, false, true),
                                                new ParkingSlot("DL-DEL-SEL-001", "Delhi", "New Delhi",
                                                                "Select Citywalk", "Select City - L1",
                                                                false, "Car", 60, 20, false, true),
                                                new ParkingSlot("TS-NZM-MSR-001", "Telangana", "Nizamabad", "MSR Mall",
                                                                "MSR Mall - Cellar",
                                                                false, "Car", 10, 15, false, true),
                                                new ParkingSlot("TS-KHM-SVR-001", "Telangana", "Khammam",
                                                                "SV Ranganath", "Complex Parking",
                                                                false, "Bike", 20, 80, false, true),
                                                new ParkingSlot("AP-KNL-CNR-001", "Andhra Pradesh", "Kurnool",
                                                                "C-NR Mall", "CNR Mall - P1",
                                                                false, "Car", 35, 45, false, true),
                                                new ParkingSlot("AP-NEL-MGB-001", "Andhra Pradesh", "Nellore",
                                                                "MGB Felicity", "MGB - P2",
                                                                true, "Car", 50, 50, false, true),
                                                new ParkingSlot("AP-GTR-LEM-001", "Andhra Pradesh", "Guntur",
                                                                "LEM Mall", "LEM Mall - Cellar",
                                                                false, "Car", 40, 60, false, true),
                                                new ParkingSlot("MH-PUN-AMN-001", "Maharashtra", "Pune", "Amanora Mall",
                                                                "Amanora - East",
                                                                false, "Car", 70, 70, false, true),
                                                new ParkingSlot("MH-PUN-PHO-001", "Maharashtra", "Pune", "Phoenix Mall",
                                                                "Phoenix - West",
                                                                false, "Bike", 80, 10, false, true),
                                                new ParkingSlot("TS-HYD-FOR-001", "Telangana", "Hyderabad",
                                                                "Forum Mall", "Forum Mall - B2",
                                                                false, "Car", 15, 90, false, true));
                                slotRepository.saveAll(initialSlots);
                        }

                        if (userRepository.count() == 0) {
                                userRepository.save(
                                                new User("DEMO-001", "Demo User", "user@parkease.com", "user123",
                                                                "user", "Car", "AP39HQ9999"));
                        }
                };
        }
}
