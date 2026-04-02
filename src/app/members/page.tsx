"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Stack,
  Divider,
  Link
} from "@mui/material";

// ─── Types ───────────────────────────────────────────────────────────────────

type MemberRole = "Executive Board" | "Tech Lead" | "Design Lead" | "Project Lead" | "Member";

interface Member {
  id: string;
  name: string;
  graduationYear: number;
  major: string;
  role: MemberRole;
  bio?: string;
  linkedin?: string;
  github?: string;
  githubUsername?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MEMBERS: Member[] = [
  {
    id: "1",
    name: "Dr. Gregor",
    graduationYear: 2027,
    major: "C.S.",
    role: "Executive Board",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    linkedin: "https://linkedin.com/in/gregor",
    github: "https://github.com/gregor",
    githubUsername: "gregor",
  },
  {
    id: "2",
    name: "Dr. Plank",
    graduationYear: 2027,
    major: "C.E.",
    role: "Executive Board",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    linkedin: "https://linkedin.com/in/plank",
    github: "https://github.com/plank",
    githubUsername: "plank",
  },
  {
    id: "3",
    name: "Dr. Marz",
    graduationYear: 2027,
    major: "C.S.",
    role: "Tech Lead",
    bio: "Passionate about building scalable web applications.",
    linkedin: "https://linkedin.com/in/marz",
    github: "https://github.com/marz",
    githubUsername: "marz",
  },
  {
    id: "4",
    name: "Dr. Jantz",
    graduationYear: 2027,
    major: "C.S.",
    role: "Tech Lead",
    bio: "Interested in open source tooling and developer experience.",
    linkedin: "https://linkedin.com/in/jantz",
    github: "https://github.com/jantz",
    githubUsername: "jantz",
  },
  {
    id: "5",
    name: "Dr. Emrich",
    graduationYear: 2027,
    major: "C.S.",
    role: "Member",
    bio: "Interested in machine learning and its applications in social good.",
    linkedin: "https://linkedin.com/in/emrich",
    github: "https://github.com/emrich",
    githubUsername: "emrich",
  },
];

// ─── MemberTable ─────────────────────────────────────────────────────────────

function MemberTable({
  members,
  selectedId,
  onSelect,
}: {
  members: Member[];
  selectedId: string | null;
  onSelect: (member: Member) => void;
}) {
  return (
    <TableContainer component={Box} sx={{ maxHeight: 420, border: 1, borderColor: "divider", borderRadius: 1 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Name:</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Year:</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Major:</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Role:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 6, color: "text.secondary" }}>
                No members match your search.
              </TableCell>
            </TableRow>
          ) : (
            members.map((member) => (
              <TableRow
                key={member.id}
                hover
                onClick={() => onSelect(member)}
                selected={selectedId === member.id}
                sx={{ cursor: "pointer" }}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(member);
                  }
                }}
              >
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.graduationYear}</TableCell>
                <TableCell>{member.major}</TableCell>
                <TableCell sx={{ color: "text.secondary" }}>{member.role}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ─── MemberDetail ─────────────────────────────────────────────────────────────

function MemberDetail({ member }: { member: Member | null }) {
  if (!member) {
    return (
      <Typography color="text.secondary" variant="body2" sx={{ mt: 2 }}>
        Select a member to view details.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h6" fontWeight={600}>
          {member.name}:
        </Typography>
        <Divider sx={{ my: 1 }} />
      </Box>

      {member.bio && (
        <Box>
          <Typography variant="body2" fontWeight={500}>Bio:</Typography>
          <Typography variant="body2" color="text.secondary">
            {member.bio}
          </Typography>
        </Box>
      )}

      {member.linkedin && (
        <Box>
          <Typography variant="body2" fontWeight={500}>LinkedIn:</Typography>
          <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" variant="body2" sx={{ wordBreak: 'break-all' }}>
            {member.linkedin}
          </Link>
        </Box>
      )}

      {member.github && (
        <Box>
          <Typography variant="body2" fontWeight={500}>GitHub:</Typography>
          <Link href={member.github} target="_blank" rel="noopener noreferrer" variant="body2" sx={{ wordBreak: 'break-all' }}>
            {member.github}
          </Link>
        </Box>
      )}

      {member.githubUsername && (
        <Box
          component="img"
          src={`https://ghchart.rshah.org/${member.githubUsername}`}
          alt={`${member.name}'s GitHub contributions`}
          sx={{ width: "100%", borderRadius: 1, mt: 1 }}
        />
      )}
    </Stack>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MembersPage() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return MEMBERS;
    return MEMBERS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.major.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        String(m.graduationYear).includes(q)
    );
  }, [searchQuery]);

  return (
    <Box component="main" sx={{ maxWidth: 'lg', mx: 'auto', py: 4, px: 2 }}>
      <Stack direction="row" spacing={3}>
        {/* Left: filters + table */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center" }}>
            <Button variant="outlined" size="small" color="inherit">
              Filters
            </Button>
            <TextField
              size="small"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flex: 1, maxWidth: 300 }}
            />
          </Stack>

          <MemberTable
            members={filteredMembers}
            selectedId={selectedMember?.id ?? null}
            onSelect={setSelectedMember}
          />
        </Box>

        {/* Right: detail panel */}
        <Box sx={{ width: 350, flexShrink: 0 }}>
          <MemberDetail member={selectedMember} />
        </Box>
      </Stack>
    </Box>
  );
}