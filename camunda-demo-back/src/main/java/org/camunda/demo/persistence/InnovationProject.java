package org.camunda.demo.persistence;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.StringJoiner;

@Entity
public class InnovationProject {

    @Id
    private String projectName;

    private String option;

    private String result;

    public String getProjectName() {
        return projectName;
    }

    public InnovationProject setProjectName(String projectName) {
        this.projectName = projectName;
        return this;
    }

    public String getOption() {
        return option;
    }

    public InnovationProject setOption(String option) {
        this.option = option;
        return this;
    }

    public String getResult() {
        return result;
    }

    public InnovationProject setResult(String result) {
        this.result = result;
        return this;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", InnovationProject.class.getSimpleName() + "[", "]")
                .add("projectName='" + projectName + "'")
                .add("option='" + option + "'")
                .add("result='" + result + "'")
                .toString();
    }
}
