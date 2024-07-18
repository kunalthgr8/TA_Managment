// import {ApiError} from '../../utils/ApiError.js';
// import {ApiResponse} from '../../utils/ApiResponse.js';
import { response } from 'express';
import Talist from '../../models/ta/talist.js';

import { exec } from 'child_process';
const academicsResolvers = {
//   Query: {
//     
//   },
  Mutation: {
    trainModel: async () => {
      try {
        // const scriptPath = path.join('../../../', 'train.py');
        const scriptPath = "/home/lalit/Desktop/TA/TA_Managment/Backend/train.py"
        
        // Execute the Python script
        await new Promise((resolve, reject) => {
          exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error: ${error.message}`);
              reject(`Error: ${error.message}`);
            }
            if (stderr) {
              console.error(`Stderr: ${stderr}`);
              reject(`Stderr: ${stderr}`);
            }
            console.log(`Stdout: ${stdout}`);
            resolve(`Training completed successfully.`);
          });
        });

        
        return 'Training completed successfully.';
      } catch (error) {
        console.error(error);
        return `Training failed: ${error}`;
      }
    },
    getIdNumbersByCourse: async (_, { courseName,courseId }) => {
      try {
        const scriptPath = "/home/lalit/Desktop/TA/TA_Managment/Backend/predict.py";
        
        const result = await new Promise((resolve, reject) => {
          exec(`python3 ${scriptPath} "${courseName}"`, (error, stdout, stderr) => {
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
          });
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
        return idNumbers;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
};

export default academicsResolvers;
