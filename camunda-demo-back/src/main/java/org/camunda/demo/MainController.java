package org.camunda.demo;

import org.camunda.demo.persistence.InnovationProject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@Transactional
public class MainController {

    private static Logger LOGGER = LoggerFactory.getLogger("MainController");

    @PutMapping("project")
    public void update(@RequestBody InnovationProject innovationProject) {
        LOGGER.info("***************************");
        LOGGER.info(">>>>> INCOMING REQUEST");
        LOGGER.info(innovationProject.toString());
    }
}
