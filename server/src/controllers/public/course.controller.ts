import { Request, Response, NextFunction } from "express";
import "../../models/instructor.model";
import Course from "../../models/corse.model";
import { DB_CONFIG } from "../../utils/constants";
import { escapeRegex } from "../../utils/helpers";

// - GET /api/version/courses?page=1&limit=10 (pagination)
export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.params; // From route parameter
    const searchQuery = req.query.search as string; // From query parameter
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || DB_CONFIG.PAGE_LIMIT;
    const skip = (page - 1) * limit;

    // Use search from either params or query (params take precedence)
    const finalSearch = search || searchQuery;

    let query = {};
    let totalCourses: number;

    // Build search query if search term exists
    if (finalSearch && finalSearch !== "all" && typeof finalSearch === "string" && finalSearch.trim() !== "") {
      const regex = new RegExp(escapeRegex(finalSearch), "i");
      query = {
        $or: [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
          { tags: { $regex: regex } },
        ],
      };
      totalCourses = await Course.countDocuments(query);
    } else {
      // No search or "all" - get all courses
      totalCourses = await Course.countDocuments();
    }

    const courses = await Course.find(query)
      .populate("instructor", "firstName lastName username avatar")
      .sort({ noOfEnrollment: -1 })
      .skip(skip)
      .limit(limit);

    const hasMore = page * limit < totalCourses;

    res.status(200).json({
      courses,
      pagination: {
        page,
        limit,
        totalCourses,
        totalPages: Math.ceil(totalCourses / limit),
        hasMore,
        searchTerm: finalSearch && finalSearch !== "all" ? finalSearch : undefined
      }
    });
  } catch (error: unknown) {
    return next(error);
  }
};

// Optional: Keep the original simple endpoint for specific use cases
export const getFeaturedCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "firstName lastName username avatar")
      .sort({ noOfEnrollment: -1 })
      .limit(5); // Fixed limit for featured courses

    res.status(200).json({ courses });
  } catch (error: unknown) {
    return next(error);
  }
};
