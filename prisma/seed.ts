import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const employerUser = await prisma.user.upsert({
    where: { email: "employer@demo.com" },
    update: {},
    create: {
      email: "employer@demo.com",
      name: "Priya Sharma",
      role: "EMPLOYER",
      passwordHash,
      employerProfile: {
        create: {
          companyName: "Sunrise Multispecialty Hospital",
          companyWebsite: "https://sunrisehospital.example.com",
          contactPhone: "+91 98765 43210",
          subscriptionStatus: "ACTIVE",
          subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      },
    },
    include: { employerProfile: true },
  });

  const jobSeekerUser = await prisma.user.upsert({
    where: { email: "jobseeker@demo.com" },
    update: {},
    create: {
      email: "jobseeker@demo.com",
      name: "Rahul Verma",
      role: "JOBSEEKER",
      passwordHash,
      jobSeekerProfile: {
        create: {
          headline: "Registered Nurse, 5 years ICU experience",
          specialty: "Registered Nurse",
          yearsExperience: 5,
          phone: "+91 91234 56789",
        },
      },
    },
    include: { jobSeekerProfile: true },
  });

  const employerProfileId = employerUser.employerProfile!.id;

  const jobsData = [
    {
      title: "ICU Registered Nurse",
      specialty: "Registered Nurse",
      location: "Mumbai, Maharashtra",
      employmentType: "FULL_TIME" as const,
      description:
        "Sunrise Multispecialty Hospital is looking for an experienced ICU Registered Nurse to join our critical care team. BLS/ACLS certification required.",
      salaryMin: 35000,
      salaryMax: 55000,
    },
    {
      title: "General Physician",
      specialty: "Physician",
      location: "Pune, Maharashtra",
      employmentType: "FULL_TIME" as const,
      description:
        "Seeking an MBBS/MD General Physician for our outpatient department. Flexible shifts available.",
      salaryMin: 80000,
      salaryMax: 120000,
    },
    {
      title: "Physiotherapist (Part-time)",
      specialty: "Physiotherapist",
      location: "Bengaluru, Karnataka",
      employmentType: "PART_TIME" as const,
      description:
        "Part-time physiotherapist needed for our rehabilitation unit, 4 hours a day, 5 days a week.",
      salaryMin: 20000,
      salaryMax: 30000,
    },
  ];

  for (const jobData of jobsData) {
    const existing = await prisma.job.findFirst({
      where: { title: jobData.title, employerId: employerProfileId },
    });
    if (!existing) {
      await prisma.job.create({ data: { ...jobData, employerId: employerProfileId } });
    }
  }

  console.log("Seed complete.");
  console.log("Employer login: employer@demo.com / password123");
  console.log("Job seeker login: jobseeker@demo.com / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
