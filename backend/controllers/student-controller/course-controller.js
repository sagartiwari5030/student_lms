// const Course = require("../../models/Course");
// const StudentCourses = require("../../models/StudentCourses");

// const getAllStudentViewCourses = async (req, res) => {
//   try {
//     const {
//       category = [],
//       level = [],
//       primaryLanguage = [],
//       sortBy = "price-lowtohigh",
//     } = req.query;

//     console.log(req.query, "req.query");

//     let filters = {};
//     if (category.length) {
//       filters.category = { $in: category.split(",") };
//     }
//     if (level.length) {
//       filters.level = { $in: level.split(",") };
//     }
//     if (primaryLanguage.length) {
//       filters.primaryLanguage = { $in: primaryLanguage.split(",") };
//     }

//     let sortParam = {};
//     switch (sortBy) {
//       case "price-lowtohigh":
//         sortParam.pricing = 1;

//         break;
//       case "price-hightolow":
//         sortParam.pricing = -1;

//         break;
//       case "title-atoz":
//         sortParam.title = 1;

//         break;
//       case "title-ztoa":
//         sortParam.title = -1;

//         break;

//       default:
//         sortParam.pricing = 1;
//         break;
//     }

//     const coursesList = await Course.find(filters).sort(sortParam);

//     res.status(200).json({
//       success: true,
//       data: coursesList,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured! ",
//     });
//   }
// };

// const getStudentViewCourseDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const courseDetails = await Course.findById(id);

//     if (!courseDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "No course details found",
//         data: null,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: courseDetails,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured!",
//     });
//   }
// };

// const checkCoursePurchaseInfo = async (req, res) => {
//   try {
//     const { id, studentId } = req.params;
//     const studentCourses = await StudentCourses.findOne({
//       userId: studentId,
//     });

//     const ifStudentAlreadyBoughtCurrentCourse =
//       studentCourses.courses.findIndex((item) => item.courseId === id) > -1;
//     res.status(200).json({
//       success: true,
//       data: ifStudentAlreadyBoughtCurrentCourse,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occuredffff!",
//     });
//   }
// };

// module.exports = {
//   getAllStudentViewCourses,
//   getStudentViewCourseDetails,
//   checkCoursePurchaseInfo,
// };



const mongoose = require("mongoose");
const StudentCourses = require("../../models/StudentCourses");

const checkCoursePurchaseInfo = async (req, res) => {
  try {
    const { id, studentId } = req.params;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course or student ID",
      });
    }

    // Fetch student courses
    const studentCourses = await StudentCourses.findOne({ userId: studentId });

    // Handle case where no courses exist for the student
    if (!studentCourses || !studentCourses.courses) {
      return res.status(200).json({
        success: true,
        data: false,
      });
    }

    // Check if the course is already purchased
    const ifStudentAlreadyBoughtCurrentCourse =
      studentCourses.courses.findIndex((item) => item.courseId.toString() === id) > -1;

    res.status(200).json({
      success: true,
      data: ifStudentAlreadyBoughtCurrentCourse,
    });
  } catch (e) {
    console.error("Error in checkCoursePurchaseInfo:", e.message); // Log the error message
    console.error(e.stack); // Log the full error stack for debugging

    res.status(500).json({
      success: false,
      message: "Failed to check course purchase information. Please try again later.",
    });
  }
};

module.exports = {
  checkCoursePurchaseInfo,
};
