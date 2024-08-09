BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Company] (
    [companyID] INT NOT NULL IDENTITY(1,1),
    [companyName] NVARCHAR(1000) NOT NULL,
    [companyCNPJ] VARCHAR(14) NOT NULL,
    [companyCEP] VARCHAR(8) NOT NULL,
    [companyStreet] VARCHAR(255) NOT NULL,
    [companyCity] VARCHAR(100) NOT NULL,
    [companyState] VARCHAR(100) NOT NULL,
    [companyCountry] VARCHAR(100) NOT NULL,
    [companyFilial] BIT NOT NULL CONSTRAINT [Company_companyFilial_df] DEFAULT 0,
    [companyDateOpened] DATETIME2 NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Company_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [Company_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Company_pkey] PRIMARY KEY CLUSTERED ([companyID])
);

-- CreateTable
CREATE TABLE [dbo].[TrainingData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [companyID] INT NOT NULL,
    [allData] NVARCHAR(1000) NOT NULL,
    [labels] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [TrainingData_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [TrainingData_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[MLModel] (
    [id] INT NOT NULL IDENTITY(1,1),
    [modelParameters] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [MLModel_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [MLModel_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Decision] (
    [id] INT NOT NULL IDENTITY(1,1),
    [companyID] INT NOT NULL,
    [reason] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Decision_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Decision_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[TrainingData] ADD CONSTRAINT [TrainingData_companyID_fkey] FOREIGN KEY ([companyID]) REFERENCES [dbo].[Company]([companyID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Decision] ADD CONSTRAINT [Decision_companyID_fkey] FOREIGN KEY ([companyID]) REFERENCES [dbo].[Company]([companyID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
