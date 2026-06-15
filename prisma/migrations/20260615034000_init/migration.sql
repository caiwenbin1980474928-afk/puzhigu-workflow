-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "account" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "displayName" TEXT,
    "role" TEXT NOT NULL DEFAULT 'operator',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ViralReference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "platform" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL DEFAULT 'url',
    "contentType" TEXT,
    "parseStatus" TEXT NOT NULL DEFAULT 'pending',
    "analysisStatus" TEXT NOT NULL DEFAULT 'pending',
    "title" TEXT,
    "authorName" TEXT,
    "metricsJson" TEXT NOT NULL DEFAULT '{}',
    "rawText" TEXT,
    "summary" TEXT,
    "coverImageUrl" TEXT,
    "mediaDescription" TEXT,
    "tagsJson" TEXT NOT NULL DEFAULT '[]',
    "fitLevel" TEXT,
    "manualInputJson" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ViralAnalysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "viralReferenceId" TEXT NOT NULL,
    "hook" TEXT,
    "titleFormula" TEXT,
    "structure" TEXT,
    "emotion" TEXT,
    "targetAudience" TEXT,
    "interactionTriggers" TEXT,
    "visualStyle" TEXT,
    "scenicFit" TEXT,
    "originalityBoundary" TEXT,
    "riskNotes" TEXT,
    "analysisJson" TEXT NOT NULL DEFAULT '{}',
    "provider" TEXT,
    "model" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ViralAnalysis_viralReferenceId_fkey" FOREIGN KEY ("viralReferenceId") REFERENCES "ViralReference" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ScenicMaterial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tagsJson" TEXT NOT NULL DEFAULT '[]',
    "imageUrl" TEXT,
    "validFrom" DATETIME,
    "validTo" DATETIME,
    "isRecommended" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContentDirection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "targetPlatform" TEXT NOT NULL,
    "targetAudience" TEXT,
    "contentGoal" TEXT,
    "materialIdsJson" TEXT NOT NULL DEFAULT '[]',
    "originalDirection" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "viralReferenceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContentDirection_viralReferenceId_fkey" FOREIGN KEY ("viralReferenceId") REFERENCES "ViralReference" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GenerationRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "taskType" TEXT NOT NULL DEFAULT 'content_generate',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "provider" TEXT,
    "model" TEXT,
    "inputJson" TEXT NOT NULL,
    "outputJson" TEXT,
    "errorMessage" TEXT,
    "viralReferenceId" TEXT,
    "contentDirectionId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GenerationRun_viralReferenceId_fkey" FOREIGN KEY ("viralReferenceId") REFERENCES "ViralReference" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GenerationRun_contentDirectionId_fkey" FOREIGN KEY ("contentDirectionId") REFERENCES "ContentDirection" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Draft" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contentDirectionId" TEXT,
    "generationRunId" TEXT,
    "viralReferenceId" TEXT,
    "platform" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "hashtagsJson" TEXT NOT NULL DEFAULT '[]',
    "imageSuggestionsJson" TEXT NOT NULL DEFAULT '[]',
    "imagePromptsJson" TEXT NOT NULL DEFAULT '[]',
    "videoScriptJson" TEXT NOT NULL DEFAULT '[]',
    "riskNotes" TEXT,
    "originalityNotes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "publishUrl" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Draft_contentDirectionId_fkey" FOREIGN KEY ("contentDirectionId") REFERENCES "ContentDirection" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Draft_generationRunId_fkey" FOREIGN KEY ("generationRunId") REFERENCES "GenerationRun" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Draft_viralReferenceId_fkey" FOREIGN KEY ("viralReferenceId") REFERENCES "ViralReference" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DraftVersion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "draftId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "outputJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DraftVersion_draftId_fkey" FOREIGN KEY ("draftId") REFERENCES "Draft" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PromptTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scene" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "platform" TEXT,
    "content" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AiCallLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scene" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "model" TEXT,
    "status" TEXT NOT NULL,
    "requestJson" TEXT,
    "responseJson" TEXT,
    "errorMessage" TEXT,
    "latencyMs" INTEGER,
    "relatedType" TEXT,
    "relatedId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");

-- CreateIndex
CREATE UNIQUE INDEX "ViralReference_sourceUrl_key" ON "ViralReference"("sourceUrl");

-- CreateIndex
CREATE INDEX "ViralReference_platform_parseStatus_idx" ON "ViralReference"("platform", "parseStatus");

-- CreateIndex
CREATE UNIQUE INDEX "ViralAnalysis_viralReferenceId_key" ON "ViralAnalysis"("viralReferenceId");

-- CreateIndex
CREATE INDEX "ScenicMaterial_type_status_idx" ON "ScenicMaterial"("type", "status");

-- CreateIndex
CREATE INDEX "ContentDirection_targetPlatform_status_idx" ON "ContentDirection"("targetPlatform", "status");

-- CreateIndex
CREATE INDEX "GenerationRun_status_taskType_idx" ON "GenerationRun"("status", "taskType");

-- CreateIndex
CREATE INDEX "Draft_platform_status_idx" ON "Draft"("platform", "status");

-- CreateIndex
CREATE UNIQUE INDEX "DraftVersion_draftId_version_key" ON "DraftVersion"("draftId", "version");

-- CreateIndex
CREATE INDEX "PromptTemplate_scene_enabled_idx" ON "PromptTemplate"("scene", "enabled");

-- CreateIndex
CREATE INDEX "AiCallLog_scene_status_idx" ON "AiCallLog"("scene", "status");

-- CreateIndex
CREATE INDEX "AiCallLog_relatedType_relatedId_idx" ON "AiCallLog"("relatedType", "relatedId");
