
import { exec } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createObjectCsvWriter } from "csv-writer";

import Skills from "../../models/ta/skills.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// import {ApiError} from '../../utils/ApiError.js';
// import {ApiResponse} from '../../utils/ApiResponse.js';
import { response } from 'express';
import Talist from '../../models/ta/talist.js';

const academicsResolvers = {
  Mutation: {
    generateCsv: async () => {
      try {
        // Fetch all skills data from the database
        console.log("Generating CSV file...");
        const skillsData = await Skills.find().lean();

        // Define the CSV writer
        const csvWriter = createObjectCsvWriter({
          path: join(__dirname, "../../../skillsData.csv"), // updated path
          header: [
            { id: "idNumber", title: "idNumber" },
            { id: "areaOfSpecialization", title: "areaOfSpecialization" },
            { id: "primarySkills", title: "primarySkills" },
            { id: "secondarySkills", title: "secondarySkills" },
            { id: "primaryProgSkills", title: "primaryProgSkills" },
            {
              id: "secondaryProgSkills",
              title: "secondaryProgSkills",
            },
            { id: "softwareTools", title: "softwareTools" },
            { id: "hardwareTools", title: "hardwareTools" },
            { id: "patents", title: "patents" },
            { id: "publications", title: "publications" },
          ],
        });

        // Transform the data to match CSV structure
        const records = skillsData.map((skill) => ({
          idNumber: skill.idNumber,
          areaOfSpecialization: skill.areaOfSpecialization.join(", "),
          primarySkills: skill.primarySkills.join(", "),
          secondarySkills: skill.secondarySkills.join(", "),
          primaryProgSkills: skill.primaryProgSkills.join(", "),
          secondaryProgSkills: skill.secondaryProgSkills.join(", "),
          softwareTools: skill.softwareTools.join(", "),
          hardwareTools: skill.hardwareTools.join(", "),
          patents: skill.patents.join(", "),
          publications: skill.publications.join(", "),
        }));

        // Write the records to the CSV file
        await csvWriter.writeRecords(records);

        return "CSV file has been generated successfully";
      } catch (error) {
        console.error("Error generating CSV file:", error);
        throw new Error("Internal Server Error");
      }
    },
    trainModel: async () => {
      console.log("Training model... 111111");
      try {
        // const scriptPath = path.join('../../../', 'train.py');
        const scriptPath =
          "/home/lalit/Desktop/TA/TA_Managment/Backend/train.py";
          console.log("Training model...v222222222222");
        // Execute the Python script
        await new Promise((resolve, reject) => {
          exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error: ${error.message}`);
              reject(`Error: ${error.message}`);
            }
            console.log("Training model...333333333333");
            if (stderr) {
              console.error(`Stderr: ${stderr}`);
              reject(`Stderr: ${stderr}`);
            }
            console.log(`Stdout: ${stdout}`);
            resolve(`Training completed successfully.`);
          });
        });

        
        return {
          status: 201,
          message: "Training completed successfully",
        };
      } catch (error) {
        console.error(error);
        return {
          status: 500,
          message: "Internal Server Error",
        };
      }
    },
    getIdNumbersByCourse: async (_, { courseName,courseId }) => {
      try {
        const scriptPath =
          "/home/lalit/Desktop/TA/TA_Managment/Backend/predict.py";

        const result = await new Promise((resolve, reject) => {
          exec(
            `python3 ${scriptPath} "${courseName}"`,
            (error, stdout, stderr) => {
              if (error) {
                console.error(`Error: ${error.message}`);
                reject(`Error: ${error.message}`);
              }
              if (stderr) {
                console.error(`Stderr: ${stderr}`);
                reject(`Stderr: ${stderr}`);
              }
              console.log(`Stdout: ${stdout}`);
              resolve(stdout.trim());
            }
          );
        });

        const idNumbers = result.split('\n'); // Assuming the output is newline-separated
        const course = await Talist.findOne({ courseId: courseId });
        if (!course) {
          const newCourse = new Talist({
            courseId: courseId,
            talist: idNumbers,
          });
          const response = await newCourse.save({new: true});
          
        }
        console.log(response);
        return {
          status: 201,
          message: "TA added to course successfully",
        };
      } catch (error) {
        console.error(error);
        return {
          status: 500,
          message: "Internal Server Error",
        };
      }
    },
  },
};

export default academicsResolvers;
