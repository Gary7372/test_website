import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
const faqCategories = {
  general: "Frequently Asked Questions",
  whyChooseUs: "Why Families Choose Gulugulu Pics"
};

const faqData = {
  general: [
    { question: "What types of photography services do you offer?", answer: "We specialize in baby photography, maternity shoots, family portraits, birthday shoots, cake smash sessions, and small event coverage. We offer both studio sessions and customized themed shoots." },
    { question: "Where is your studio located?", answer: "Our studio is located at F Tower, Nilaya Greens, Rajnagar Extension, Ghaziabad, UP, providing a comfortable and baby-safe environment for photoshoots." },
    { question: "Do you offer home shoots or only studio shoots?", answer: "Yes, we offer both studio and home shoots depending on your preference and the type of session." },
    { question: "Is your studio baby-safe?", answer: "Yes. Our studio is designed to be baby-friendly, hygienic, and comfortable so that little ones can enjoy the shoot safely." },
    { question: "How early should we book a photoshoot?", answer: "We recommend booking at least 5–7 days in advance to secure your preferred date and theme." },
    { question: "Do you provide props and themes for shoots?", answer: "Yes, we provide a variety of props, backdrops, and themes, especially for baby and birthday shoots." },
    { question: "How long does a photoshoot usually take?", answer: "Most sessions take around 45 minutes to 2 hours, depending on the type of shoot and the baby’s comfort." },
    { question: "When will we receive our photos?", answer: "Edited photos are usually delivered within 5–7 working days after the shoot." },
    { question: "What if my baby becomes cranky during the shoot?", answer: "That’s completely normal. We keep the session flexible and allow breaks for feeding, cuddling, or calming the baby so the experience stays relaxed." },
    { question: "How can we book a photoshoot?", answer: "You can call or WhatsApp us at 7974260538 or visit our studio at F tower, Nilaya Greens, Rajnagar Extension, Ghaziabad to book your session." }
  ],
  whyChooseUs: [
    { question: "What if my baby becomes cranky during the shoot?", answer: "No worries at all. Babies can be unpredictable, and we completely understand that. We keep our sessions flexible and allow breaks for feeding, cuddling, or calming the baby so the experience stays relaxed and comfortable." },
    { question: "What should we bring for the photoshoot?", answer: "Just bring your baby’s essentials like milk, diapers, wipes, and a favorite toy. We provide most of the props, backdrops, and setups at the studio." },
    { question: "What should we wear for the shoot?", answer: "Simple, coordinated outfits in soft colors usually work best for photos. Once you book your session, we can also guide you with outfit suggestions to make sure your photos look beautiful and timeless." },
    { question: "We are not comfortable posing. Will you guide us?", answer: "Absolutely. Most families feel the same way. We guide you through natural and simple poses so the photos look relaxed, genuine, and full of real emotions." },
    { question: "Why should we choose Gulugulu Pics?", answer: "We focus on natural emotions, baby-safe setups, and a relaxed shooting environment. Being located inside Nilaya Greens also makes it convenient for families in the community to capture their special moments." }
  ]
};

export default function FAQPage() {
    return (
        <main className="w-full bg-brand-bg text-brand-fg min-h-screen flex flex-col relative">
            <div className="flex-grow pt-0">
                <FAQ 
                  title="Everything You Need to Know"
                  subtitle="Let's answer some questions"
                  categories={faqCategories} 
                  faqData={faqData} 
                />
            </div>
            <Footer hideCallToAction={true} />
        </main>
    );
}
