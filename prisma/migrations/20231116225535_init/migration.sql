-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "Position" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "Value" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Abbreviation" TEXT NOT NULL,
    "City" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
