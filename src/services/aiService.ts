const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface AIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface GenerateContentParams {
  section: string;
  userInput?: string;
  currentData?: any;
  jobTitle?: string;
  industry?: string;
}

export class AIService {
  private async makeRequest(messages: any[]): Promise<string> {
    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Resume Builder AI Assistant'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat-v3-0324:free',
          messages: messages,
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: AIResponse = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate content. Please try again.');
    }
  }

  async generateSummary({ userInput, currentData, jobTitle, industry }: GenerateContentParams): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are a professional resume writer. Generate a compelling professional summary that is 2-3 sentences long, includes quantifiable achievements when possible, and is tailored for ATS systems. Focus on impact and results.`
      },
      {
        role: 'user',
        content: `Generate a professional summary for someone with the following details:
        Job Title/Role: ${userInput || jobTitle || 'Professional'}
        Industry: ${industry || 'General'}
        Experience Level: ${currentData?.workExperience?.length > 3 ? 'Senior' : currentData?.workExperience?.length > 0 ? 'Mid-level' : 'Entry-level'}
        Skills: ${currentData?.skills?.map((s: any) => s.name).join(', ') || 'Various skills'}
        
        Make it compelling, specific, and include metrics where appropriate.`
      }
    ];

    return await this.makeRequest(messages);
  }

  async generateExperienceDescription({ userInput, currentData }: GenerateContentParams): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are a professional resume writer. Generate a compelling job description that focuses on achievements and impact rather than just responsibilities. Use action verbs, include quantifiable results, and make it ATS-friendly.`
      },
      {
        role: 'user',
        content: `Generate a job description for the following role:
        Position: ${userInput || 'Professional Role'}
        Context: ${currentData?.summary || 'Professional with relevant experience'}
        Skills: ${currentData?.skills?.map((s: any) => s.name).slice(0, 5).join(', ') || 'Relevant skills'}
        
        Focus on achievements, use strong action verbs, and include specific metrics where possible. Keep it to 2-3 sentences.`
      }
    ];

    return await this.makeRequest(messages);
  }

  async generateAchievements({ userInput, currentData }: GenerateContentParams): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are a professional resume writer. Generate 3-4 bullet points highlighting key achievements. Each bullet should start with a strong action verb and include quantifiable results (percentages, dollar amounts, time saved, etc.). Format as bullet points with • symbol.`
      },
      {
        role: 'user',
        content: `Generate achievement bullet points for:
        Role/Context: ${userInput || 'Professional role'}
        Background: ${currentData?.summary || 'Professional with relevant experience'}
        Skills: ${currentData?.skills?.map((s: any) => s.name).slice(0, 5).join(', ') || 'Relevant skills'}
        
        Focus on measurable impact, cost savings, revenue generation, process improvements, or team leadership. Use specific numbers and percentages.`
      }
    ];

    return await this.makeRequest(messages);
  }

  async generateSkills({ userInput, currentData }: GenerateContentParams): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are a professional resume writer. Generate a list of relevant skills based on the user's role and industry. Return only the skill names separated by commas, no explanations.`
      },
      {
        role: 'user',
        content: `Generate relevant skills for:
        Role/Industry: ${userInput || 'Professional'}
        Current Skills: ${currentData?.skills?.map((s: any) => s.name).join(', ') || 'None listed'}
        Experience: ${currentData?.workExperience?.map((exp: any) => exp.position).join(', ') || 'General experience'}
        
        Include both technical and soft skills relevant to this role. Return 8-12 skills as a comma-separated list.`
      }
    ];

    return await this.makeRequest(messages);
  }

  async improveSummary(currentSummary: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are a professional resume writer. Improve the given professional summary to make it more compelling, specific, and ATS-friendly. Focus on adding quantifiable achievements and stronger action words.`
      },
      {
        role: 'user',
        content: `Improve this professional summary:
        "${currentSummary}"
        
        Make it more impactful by adding specific metrics, stronger action verbs, and clearer value propositions. Keep it 2-3 sentences.`
      }
    ];

    return await this.makeRequest(messages);
  }

  async improveExperience(currentDescription: string, position: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are a professional resume writer. Improve the given job description to be more achievement-focused and quantifiable. Use strong action verbs and specific metrics.`
      },
      {
        role: 'user',
        content: `Improve this job description for a ${position}:
        "${currentDescription}"
        
        Make it more achievement-focused with specific metrics, stronger action verbs, and clearer impact statements.`
      }
    ];

    return await this.makeRequest(messages);
  }

  async generatePersonalizedSuggestions(resumeData: any): Promise<string[]> {
    const messages = [
      {
        role: 'system',
        content: `You are a professional resume consultant. Analyze the provided resume data and generate 3-5 specific, actionable suggestions for improvement. Focus on content, structure, and ATS optimization.`
      },
      {
        role: 'user',
        content: `Analyze this resume data and provide specific improvement suggestions:
        
        Personal Info: ${resumeData.personalInfo?.firstName} ${resumeData.personalInfo?.lastName}
        Summary: ${resumeData.summary || 'Not provided'}
        Experience: ${resumeData.workExperience?.length || 0} positions
        Education: ${resumeData.education?.length || 0} entries
        Skills: ${resumeData.skills?.length || 0} skills listed
        Projects: ${resumeData.projects?.length || 0} projects
        Certifications: ${resumeData.certifications?.length || 0} certifications
        
        Provide 3-5 specific, actionable suggestions for improvement. Format as a simple list.`
      }
    ];

    const response = await this.makeRequest(messages);
    return response.split('\n').filter(line => line.trim().length > 0).slice(0, 5);
  }
}

export const aiService = new AIService();