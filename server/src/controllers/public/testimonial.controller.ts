import { Request, Response, NextFunction } from "express";
import Testimonial from "../../models/testimonial.model";
import { DB_CONFIG } from "../../utils/constants";

// api/version/testimonials?page=number&limit=number - GET
export const getTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = parseInt(req.query.page as string);
    let limit = parseInt(req.query.limit as string);
    page = (isNaN(page) || page <= 0) ? 1 : page;
    limit = (isNaN(limit) || limit <= 0 || limit > DB_CONFIG.PAGE_LIMIT) ? DB_CONFIG.PAGE_LIMIT : limit;
    const skip = (page - 1) * limit;

    const testimonials = await Testimonial.find()
      .sort({ rating: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination info
    const totalTestimonials = await Testimonial.countDocuments();

    // Calculate if there are more testimonials
    const hasMore = page * limit < totalTestimonials;

    res.status(200).json({
      testimonials,
      pagination: {
        page,
        limit,
        skip,
        total: totalTestimonials,
        returned: testimonials.length,
        totalPages: Math.ceil(totalTestimonials / limit),
        hasMore,
        nextPage: hasMore ? page + 1 : null
      }
    });
  } catch (error: unknown) {
    console.error('Error fetching testimonials:', error);
    return next(error);
  }
};
