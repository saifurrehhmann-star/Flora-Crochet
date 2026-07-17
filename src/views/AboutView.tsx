import { Heart, Sparkles, Sprout, ShieldCheck } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="about-view-container">
      
      {/* Editorial Title */}
      <div className="text-center space-y-3">
        <span className="text-xs text-[#bc4747] font-extrabold uppercase tracking-widest bg-pastel-pink py-1 px-3.5 rounded-full">Our Story</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-850 font-display">Crafting Loops & Stitched Dreams</h2>
        <p className="text-sm text-stone-500 max-w-lg mx-auto font-serif italic">
          &ldquo;Every knot is a thought, every stitch is a wish, and every creation is a companion.&rdquo;
        </p>
      </div>

      {/* Narrative grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="rounded-[40px] overflow-hidden border border-stone-150 shadow-sm aspect-[4/3] bg-stone-50">
          <img
            src="https://images.unsplash.com/photo-1584992208738-00b6fb891462?q=80&w=800"
            alt="Yarn skeins and crochet hooks"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4 text-stone-600 leading-relaxed text-sm font-sans">
          <h3 className="text-xl font-bold text-stone-850 font-display">Born in Islamabad, Pakistan</h3>
          <p>
            FloraCrochet began in a cozy, sunlit room in Islamabad, with a single basket of pastel milk-cotton yarn and a dream to preserve the slow-craft culture in a fast-fashion world.
          </p>
          <p>
            Unlike mass-produced plastic toys, our amigurumi dolls, cute flower bouquets, and custom cozy cardigans are designed from scratch, custom stitched row-by-row, and double-knotted to withstand years of loving squishes.
          </p>
          <p className="text-stone-500 font-serif italic">
            When you purchase a piece from FloraCrochet, you are supporting independent Pakistani women artisans who practice this ancient art in their homes, blending traditional techniques with modern cottagecore aesthetic.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-br from-[#fdfcf9] to-[#fbf9f4] border border-stone-200/50 rounded-[40px] p-8 sm:p-12 space-y-8 shadow-sm">
        <h3 className="font-display font-extrabold text-stone-850 text-xl text-center">Crafting Standards We Stitch By</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-pastel-pink text-[#bc4747] rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Heart size={22} />
            </div>
            <h4 className="font-display font-bold text-stone-800 text-sm sm:text-base">Organic Milk Cotton</h4>
            <p className="text-xs text-stone-500 leading-relaxed font-sans">
              We exclusively use 5-ply organic milk-cotton yarn. This ensures our amigurumis are hypoallergenic, baby-safe, and incredibly smooth to the touch.
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-pastel-green text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Sprout size={22} />
            </div>
            <h4 className="font-display font-bold text-stone-800 text-sm sm:text-base">Eco-Friendly Stuffing</h4>
            <p className="text-xs text-stone-500 leading-relaxed font-sans">
              Our stuffing consists of highly resilient hollow-fiber cotton, giving our plushies their signature squishy rebound without going lumpy over time.
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-pastel-yellow text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Sparkles size={22} />
            </div>
            <h4 className="font-display font-bold text-stone-800 text-sm sm:text-base">Slow Cottage Quality</h4>
            <p className="text-xs text-stone-500 leading-relaxed font-sans">
              We strictly reject machinery. Every single stitch is done entirely by hand, making each plushie a unique companion with its own subtle, charming personality.
            </p>
          </div>

        </div>
      </div>

      {/* Care instructions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-stone-100 pt-12">
        <div className="md:col-span-7 space-y-4">
          <h3 className="font-display font-extrabold text-stone-850 text-lg">Amigurumi Washing Care Tips</h3>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-sans">
            Want to keep your handmade companion snuggly forever? We recommend placing your plushie inside a mesh laundry bag, wash with cold water on a delicate cycle, and lay flat to dry in a shaded area. Never wring or tumble dry!
          </p>
        </div>
        <div className="md:col-span-5 bg-white border border-stone-150 p-5 rounded-2xl flex items-center gap-3">
          <ShieldCheck className="text-emerald-600 shrink-0 w-8 h-8" />
          <div className="text-xs font-sans text-stone-500">
            <p className="font-bold text-stone-850">Double-Knot Lock Guarantee</p>
            <p className="mt-0.5">All our plush eyes are secured with safety-wash washers, preventing any risk for small children.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
